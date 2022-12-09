const express = require("express");
const multer = require("multer")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const File = require("./models/File")
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }))

const upload = multer({ dest: "uploads" }) //this is now a middleware
mongoose.connect(process.env.DATABASE_URL);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const fileData = {
    path: req.file.path,
    originalname: req.file.originalname
  }
  if (req.body.password != null && req.body.password !== "") {
    fileData.password = await bcrypt.hash(req.body.password, 10);
  }

  const file = await File.create(fileData);
  console.log(file);
  res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` })

})
app.route("/file/:id").get(handleDownload).post(handleDownload)

async function handleDownload(req, res) {
  const file = await File.findById(req.params.id)
  if (file.password != null) {
    if (req.body.password == null) {
      res.render("password");
      return;
    }
if( !(await bcrypt.compare(req.body.password,file.password))){
res.render("password",{error:true})
return 
}
  }

file.downloadCount++
await file.save();
console.log(file.downloadCount)
res.download(file.path,file.originalname);

}

app.listen(process.env.PORT, (req, res) => {
  console.log("app listening on port 3000");
})

