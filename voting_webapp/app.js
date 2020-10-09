const express = require('express')
const bodyParser = require('body-parser')
const app = express()

var voters = [] 
var sides = []


app.set('view engine', 'ejs');  //
 
// files must be served from public directory in NodeJS 
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {     
    res.render('index') 
})

app.post('/', (req, res) => {
     //use lists bc insertion order is maintained 
    voters.push(req.body.firstName)
    res.render('choose')
})

app.get('/choose', (req, res) => {
   res.render('choose')
})

app.post('/results', (req, res) => {    
    sides.push(req.body.side)  
    res.render('results', {"userNameList": voters, "sideList": sides})   
})

app.listen(3000, () =>  {
    console.log("Server is up and running")
})


// NodeJS EJS BootStrap Pratice Exercise
// Use BootStrap Carousel Feature and EJS templating to dynamically populate users who have voted 
// Elliott Arnold 10-7-20 
