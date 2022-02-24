module.exports= (sequelize, dataTypes) => {

    let alias="User"
    let cols = {
        id: {
            type: dataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement:true, 


        },
        user: {
            type: dataTypes.STRING (45),

        },
      
        
   
    }
    let config = {
        tableName: "user",
        timestamps:false
    }
 const User = sequelize.define (alias, cols, config )

 return User
}