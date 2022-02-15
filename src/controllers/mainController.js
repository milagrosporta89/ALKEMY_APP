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
    entryForm: (req,res) =>{/* para enviar formulario */
        db.Transaction.create({ /* hacer un fetch con los datos traidos por el endpoint generado al hacer on submit */
            date:req.body.date,
            category: req.body.category,
            amount: req.body.amount,
            type: "entry"
 
        });/*  res.redirect("/") */
            res.send(req.body)},
    
    withdrawal: (req,res) =>{
        res.render ("withdrawalForm")
    },
}

module.exports = mainController