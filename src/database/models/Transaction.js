module.exports= (sequelize, dataTypes) => {

    let alias="Transaction"
    let cols = {
        id: {
            type: dataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement:true, 


        },
        date: {
            type: dataTypes.DATE,

        },
        category: {
            type:dataTypes.STRING (50)

        },
        amount: {
            type: dataTypes.INTEGER
        },
        type: {
            type: dataTypes.STRING (50)
        },
        
   
    }
    let config = {
        tableName: "transactions",
        timestamps:false
    }
 const Transaction = sequelize.define (alias, cols, config )

 return Transaction
}