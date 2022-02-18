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
       
          db.Transaction.create({ 
            date:req.body.date,
            category: req.body.category ,
            amount: req.body.amount,
            type: "entry"
 
        }).then ((resultado) =>{ 

            res.render("index")
        })
           

        }, 
    withdrawalForm:(req,res)=> {
       
          db.Transaction.create({ 
            date:req.body.date,
            category: req.body.category ,
            amount: req.body.amount * -1,
            type: "withdrawal"
 
        }).then ((resultado) =>{ 

            res.render("index")
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
     
        db.Transaction.update({ 
            date:req.body.date,
            category: req.body.category ,
            amount: req.body.amount, 
        },
        {
            where: {id:req.params.id}
        }
        ).then ((resultado) =>{ 

            res.json({ redirect: "/" });
        })
           
    }
}

module.exports = mainController