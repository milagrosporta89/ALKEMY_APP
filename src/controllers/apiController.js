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
                {type :"entry"},

            order : [
                    ["date","DESC"]
                ],
            limit:10
            
        }   
        )
        .then (transactions => { 
            
                
                
     /*            for(i=0; i<transactions.data.length; i++){                    
                    contador = contador + transactions.data[i].amount  
                }//---- podia hacerse que la operacion de suma de todos los valores se haga antes de mandar el Json, asi no mandamos la data completa para sumarla desde el front (no se puede trabajar con la respuesta a la peticioon si antes no se la transformo a json )
 */
            return res.status(200).json({
                data: transactions,
   
                status:200 
            })
         
        })
},
    withdrawalData: (req, res) => {
        db.Transaction.findAll({
            where : 
                {type :"withdrawal"},
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