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

    entry: (req,res) => {
        res.render("entryForm")
    },
  
    entryForm:(req,res)=> {
       db.Category.findOne({where : {category : req.body.category}})
       .then ((result )=> {
          db.Transaction.create({ 
            date:req.body.date,
            id_category: result.id ,
            amount: req.body.amount,
            type: "entry"})
 
        }).then ((resultado) =>{ 

            res.redirect("/")
            
        })
           

        }, 
    withdrawalForm:(req,res)=> {
        db.Category.findOne({where : {category : req.body.category}})
        .then ((result )=> {
           db.Transaction.create({ 
             date:req.body.date,
             id_category: result.id ,
             amount: req.body.amount *-1,
             type: "withdrawal"})
  
         }).then ((resultado) =>{ 
 
             res.redirect ("/")
         })
            
 
         }, 
          
    withdrawal: (req,res) =>{
        res.render ("withdrawalForm")
    },
     edit: (req,res) => {

        res.render("editForm")
    },
    delete: (req,res) => {
      let id = req.params.id

      db.Transaction.destroy({
          where: {id:id}
      }).then(result => {
        res.json({ redirect: "/" });
      })
    },
    update: (req,res) => {
        db.Category.findOne(({where : {category : req.body.category}}))
        .then ((result) => {
            db.Transaction.update ({
                date :req.body.date,
                id_category: result.id,
                amount: req.body.amount

            },
            {
                where : { id : req.params.id }
            })



        })
        .then ((result)=>{
            res.json ({redirect :"/"})
        })
  
           
    },
    desktop: (req,res) => {
        res.render ("index")
    },
    categoryEdit: (req,res) => {
        res.render ("categoryEdit")
    },
    newCategory : (req,res) => {
        db.Category.create ({
            category: req.body.category, 
            type: req.body.type
        }) 
        res.render ("index")
    }
}   

module.exports = mainController