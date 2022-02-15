const fs = require('fs');
const path = require('path');
const db = require ("../database/models")
/* const productsFilePath = path.join(__dirname, '../database/productDataBase.json'); */
/* const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */


const apiController = {

    balance: (req, res) => {
        db.Transaction.findAll(   
        )
        .then (transactions => {
            return res.status(200).json(transactions)
         
        })
},
}
   

module.exports = apiController