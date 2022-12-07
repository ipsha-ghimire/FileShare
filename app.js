const express= require("express");
const multer= require('multer');
const mongoose= require("mongoose")
require("dotenv").config();
const app= express();
mongoose.connect(process.env.DATABASE_URL);
const upload= multer({dest:"uploads"}); //a middleware

app.set("view engine","ejs");
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("index");
});

app.post("/upload",upload.array("file"),(req,res)=>{
res.send('hi');
})
app.listen(process.env.PORT,(req,res)=>{
  console.log("app listening on port 3000");
})

