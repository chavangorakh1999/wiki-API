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


app.route("/articles")
    .get( (req, res) => {
        Article.find({}, (err, foundArticle) => {
            if(!err){
            res.send(foundArticle);
            }else{
                res.send(err);
            } 
        });
    })
    .post((req,res)=>{
        
        const article= new Article({
            title:req.body.title,
            content:req.body.content
        });
        article.save((err)=>{
            if(!err){
                res.send("Sucessfully added the new article!");
            }else{
                res.send(err);
            }
        });

        
    })
    .delete((req,res)=>{
    Article.deleteMany((err)=>{
        if(!err){
            res.send("Sucessfully deleted all items");
        }else{
            res.send(err);
        }
    })
});

app.route("/articles/:requestedArticle")
    .get((req,res)=>{
        Article.findOne({title: req.params.requestedArticle},(err,foundArticle)=>{
            if(foundArticle){
                res.send(foundArticle);
            }
            else{
                res.send("No articles matching this title");
            }
        });
    })
    .put((req,res)=>{
        Article.updateMany(
            {title: req.params.requestedArticle},
            {title: req.body.title, content: req.body.content},
            {overwrite:true},
            (err)=>{
                if(err){
                    res.send(err);
                }else{
                    res.send("Sucessfully updated the article");
                }
            }
        );
    });


const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log("Server started at port " + port);
});
