const req = require('express/lib/request');
const fs = require('fs');
const path = require('path');
const db = require ("../database/models")

const mainController = {

    index: (req, res) => {
        res.render("index");
        },

    add:(req,res) => {
        db.Category.findOne({where : {category: req.body.category}})
            .then ((result) => {
                if ((result.type) === "entry"){
                    db.Transaction.create ({
                        date:req.body.date,
                        id_category: result.id,
                        amount: req.body.amount,
                        type: result.type
                    })
                }else{
                    db.Transaction.create ({
                        date:req.body.date,
                        id_category: result.id ,
                        amount: req.body.amount *-1,
                        type: result.type
                    })
                    console.log (result.type)


                }
            }).then ((result)=> {
                res.json ({redirect :"/"})
 
            })
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

    categoryEdit: (req,res) => {
        res.render ("categoryEdit")
    },

    newCategory : (req,res) => {
        db.Category.create ({
            category: req.body.category, 
            type: req.body.type
        }) 
        res.redirect ("/")
    }
}   

module.exports = mainController