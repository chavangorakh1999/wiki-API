const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

const article1 = new Article({
  title: "JQuery",
  content:
    "it is an library that makes the DOM model implementaton much simplier",
});
const article2 = new Article({
  title: "Article 2",
  content:
    "it is an library that makes the DOM model implementaton much simplier",
});
const defaultArticle = [article1, article2];

app.get("/articles", (req, res) => {
  Article.find({}, (err, foundArticle) => {
      if(!err){
        res.send(foundArticle);
      }else{
          res.send(err);
      } 
  });
});

app.post("/articles",(req,res)=>{
    console.log(req.body.title);
    console.log(req.body.content);
});

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log("Server started at port " + port);
});
