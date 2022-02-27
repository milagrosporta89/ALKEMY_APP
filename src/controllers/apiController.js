const fs = require('fs');
const path = require('path');
const db = require ("../database/models")

const apiController = {

    balance: (req, res) => {
        db.Transaction.findAll({
            order : [
                ["date","DESC"]
            ],
            include : [
                {
               model: db.Category,
               as: "category"}  
            ]})
        
        .then (transactions => {

            return res.status(200).json({
                data: transactions,
                status:200 
            })         
        })
    },  

    category: (req,res) => {
        db.Category.findAll ().then (data => {
            return res.status (200).json (
                {
                    data:data,
                    status: 200
                }
            )
        })
    }
}
   

module.exports = apiController