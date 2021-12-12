const express = require('express');
const fs = require('fs');
const knex = require('../database/db')
const user = express.Router()
const bodyParser = require("body-parser");
user.use(bodyParser.urlencoded({extended: true}));

//// post 
user.post('/create', (req, res) => {
    var b = {
    "id":req.body.id,
    "Book_name" : req.body.Book_name,
    "Language" : req.body.Language,
    "Writter" : req.body.Writter,
    "Released_year" : req.body.Released_year
    }   
    
    knex.select('*').from('details').where({'id':req.body.id}).then((data) => {
        if (data.length < 1) {
            knex('details').insert(b).then((data) => {
                res.send('<h1>Data has been inserted successfully..</h1>')
                console.log('Your data has been inserted successfully...');
            }).catch((err) => {
                res.send({"err" : err.message})
                console.log({"err" : err.message})
            })


            try{
                if(fs.existsSync('Book_details.json')){ 
                var a=fs.readFileSync('Book_details.json')
                let bb=JSON.parse(a)
                bb.push(b)
                fs.writeFileSync('Book_details.json',JSON.stringify(bb,null,4))
                res.send('Your data has been inserted successfully...')
                console.log('Your data has been inserted successfully...');

            }else{
                fs.writeFileSync('Book_details.json',JSON.stringify([b],null,4))
                res.send('Your data has been inserted successfully...')
                console.log('Your data has been inserted successfully...');
            }
            }catch{
                    console.log("Something wrong..");
                }
        } else {
            res.send('Data has been already inserted..')
            console.log('Data has been already inserted...')
        }
    })
})

//// Get all 
user.get('/getAll', (req, res) => {
    knex.select('*').from("details").then((data) => {
        res.render("table",{data:data})
    }).catch((err) => {
        res.send(err.message)
    })


    var a=fs.readFileSync('Book_details.json')
    let bb=JSON.parse(a)
    console.log(bb);  
})


//// Get by id 
user.get('/get/:id', (req, res) => {
    knex.select('*').from('details')
    .where({id: req.params.id})
    .then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err.message)
    })


    var a=fs.readFileSync('Book_details.json')
    let bb=JSON.parse(a)
    for( i of bb){
        if(i["id"]==req.params.id){
            console.log([i])
            break;
        }
    }
})


//// update by id
user.put('/update/:id', (req, res) => {
    knex('details').where({"id": req.params.id})
    .update(req.body).then((data) => {
        res.send("Data has been updated successfully...")
    }).catch((err) => {
        res.send(err.message)
    })


    var d=0
    var a=fs.readFileSync('Book_details.json')
    let bb=JSON.parse(a)
    for( i of bb){
        if(i["id"]==req.params.id){
            bb[d]={...i,...req.body}
            break;
        }
        d++
    }
        fs.writeFileSync('Book_details.json',JSON.stringify(bb,null,4))
        res.send("Data has been updated successfully...")
        console.log("Data has been updated successfully..")
})


//// Delete by Id ////
user.delete('/delete/:id', (req, res) => {
    knex('details').where({"id": req.params.id})
    .del().then((data) => {
        res.send("Data has been deleted successfully...")
    }).catch((err) => {
        res.send(err.message)
    })


    var d=0
    var a=fs.readFileSync('Book_details.json')
    let bb=JSON.parse(a)
    for( i of bb){
        if(i["id"]==req.params.id){
            bb.splice(d,1)
            break;
        }
        d++
    }
        fs.writeFileSync('Book_details.json',JSON.stringify(bb,null,4))
        res.send("Data has been delete successfully...")
        console.log("Data has been deleted successfully..")
})


user.post('/searchlan', (req, res) => {
    let lang= req.body.search
    knex.select('*').from('details')
    .where({"Language": lang})
    .then((data) => {
       res.render("table",{data:data})
        console.log(data)
    }).catch((err) => {
        res.send(err.message)
    })
})

module.exports = user