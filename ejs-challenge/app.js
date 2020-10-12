//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const truncate = require('truncate');
const mongoose = require("mongoose");


const homeStartingContent = "home-content-Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "about-content-Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "contact-content-Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

mongoose.Promise = global.Promise


mongoose.connect("mongodb://mongodb:27017/journalDB:", {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/journalDB:", {useNewUrlParser: true});

// create schema with validation for insertion into MongoDB 
const postSchema = {
  title: {
    type:String,
    required: [true, 'All posts must have a title']
  },
  post: {
    type:String,
    required: [true, 'All posts must content']
  }
}

// Schema's require DB models to insert data into database  
const Post = mongoose.model("Post", postSchema)

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req,res) => {
  // get all posts 
  const posts = Post.find({}, (err, found) => {
    if (!err) {
      console.log(found)      
      res.render('home' , {"embeddedText":homeStartingContent, "embeddedList":found})
    }
  }) 
})

app.get('/about', (req,res) => {
  res.render('about' , {"embeddedText":aboutContent})

})

app.get('/contact', (req,res) => {
  res.render('contact' , {"embeddedText":contactContent})
})

app.get('/compose', (req,res) => {  
  res.render('compose')
})

app.post('/compose', (req,res) => {
  console.log(req.body)

  const titlePost =  _.capitalize(req.body.title)
  const postBody = req.body.postBody
  // check if post exists with matching title 
  const results = Post.findOne({title: titlePost }, (err, found) => {
    if (!found) {
      console.log("New title")
      const post = new Post({
        title: titlePost,
        post: postBody
      })    
      post.save()
      res.redirect('/')

    } else {      
    console.log('Title headings be unique.')
    res.redirect('/compose')
     
    }
  })

})


app.get('/posts/:queryParams', (req,res) => {

  const queryParam = _.capitalize(req.params.queryParams) 
  Post.findOne({title:queryParam}, (err, found) => {
      if (!found) {
        console.log('unable to locate document')
      } else {
        res.render('post', {"title": found.title, "post": found.post, "path":req.params.queryParams })
      }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

//NodeJS MongoDB Mongoose Docker Docker-Compose 
//Implementing MongoDB inside of for use with Journal Website
//Elliott Arnold 10-12-20
