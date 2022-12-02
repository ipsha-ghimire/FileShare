const express= require("express");
const app= express();

app.set("view engine","ejs");
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("index");
});
app.listen(3000,(req,res)=>{
    console.log("app listening on port 3000");
})