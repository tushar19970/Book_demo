require('dotenv').config();
const express = require('express')
const app = express()
const path = require('path')
app.use(express.json())
app.use(express.static(__dirname+'/public'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/home',function(req,res){
    res.sendFile('/home/navgurukul25/Desktop/A2D/Book/public/create.html')
})

app.get('/create',function(req,res){
    res.sendFile('/home/navgurukul25/Desktop/A2D/Book/public/create.html')
})

const home = require('./routes/user')
app.use('/', home)

const port = 3000 || process.env.PORT

app.listen(port, () => {
    console.log(`We have connected to ${port}`)
})

