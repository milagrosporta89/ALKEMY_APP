const fs = require('fs');
const path = require('path');
const db = require ("../database/models")
/* const productsFilePath = path.join(__dirname, '../database/productDataBase.json'); */
/* const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */


const apiController = {

/*     balance: (req, res) => {
        db.Transaction.findAll(   
        )
        .then (transactions => {
            return res.status(200).json({
                data: transactions,
                status:200
            })
         
        })
}, */
    balance: (req, res) => {
        db.Transaction.findAll({
            order : [
                ["date","DESC"]
            ]
        }   
        )
        .then (transactions => {

            return res.status(200).json({
                data: transactions,
                status:200 
            })
         
        })
},
    entryData: (req, res) => {
        db.Transaction.findAll({
            where : 
                {type :"entry"}
            
        }   
        )
        .then (transactions => {

            return res.status(200).json({
                data: transactions,
                status:200 
            })
         
        })
},
    editData: (req,res) =>{
        let id= req.params.id 
        db.Transaction.findOne({ where: { id: id } })
            .then (data => {
                return res.status(200).json(
                        {
                        data: data,
                        status: 200
                        }
                        )
            })
        
    }
}
   

module.exports = apiController