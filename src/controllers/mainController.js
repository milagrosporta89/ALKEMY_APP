const req = require('express/lib/request');
const fs = require('fs');
const path = require('path');
const db = require ("../database/models")
/* const productsFilePath = path.join(__dirname, '../database/productDataBase.json'); */
/* const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */


const mainController = {

    index: (req, res) => {
        res.render("index");
},
    index2: (req,res) =>{
        db.Transaction.findAll()
            .then(function (transactions){
                res.render("index2",{transactions: transactions})
            })
  
    },
    entry: (req,res) => {
        res.render("entryForm")
    },
    entryEndPoint: (req,res) =>{
        console.log (req)
    },
    entryForm:(req,res)=> {
          db.Transaction.create({ 
            date:req.body.date,
            category: req.body.category,
            amount: req.body.amount,
            type: "entry"
 
        })},
    
    withdrawal: (req,res) =>{
        res.render ("withdrawalForm")
    },
}

module.exports = mainController