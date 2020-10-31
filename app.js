const express= require("express");
const bodyParser= require("body-parser");
const ejs = require("ejs");
const mongoose= require("mongoose");

const app= express();

app.set("view engine",ejs);
app .use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",{ useUnifiedTopology: true,useNewUrlParser: true  });

const articleSchema = new mongoose.Schema({
   title:String,
   content:String 
});

const Article = mongoose.model("Article",articleSchema);

app.get("/",(req,res)=>{
    res.render("home");
});

const port= process.env.PORT || 3000;
app.listen(port,(req,res)=>{
console.log("Server started at port "+port);
});

