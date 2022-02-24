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
        id_category: {
            type:dataTypes.INTEGER

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
 Transaction.associate = function (models) {

    Transaction.belongsTo(models.Category, {     
        as: "category",
        foreignKey: "id_category"
    })
 }
 return Transaction
}