/* -------------------------------------DROPDOWN SCRIPT -------------------------------  */
document.addEventListener("DOMContentLoaded", () => {
    fetchCategory();

})

/* PETICION CATEGORY DATA -----------------------*/
const fetchCategory= async () => {
    try{
        const res= await fetch ("/category")
        const data = await res.json()
        fillDropDownEntry (data)
        fillDropDownWithdrawal (data)


        
    }catch (error){
        console.log (error)
    }finally{
        console.log ("finally")
    }
};

 const fillDropDownEntry= (data) => {
     let array =[data]
     let dataE = array[0].data.filter (e => e.type.includes ("entry"))    
     let newEntry = document.querySelector (".entryForm_title").dataset.type 
     
     if (newEntry == "entry"){

                 for ( i=0; i<dataE.length;i ++) {            
        
                    let opt = document.createElement ("option")
                    opt.textContent = dataE[i].category
                    document.getElementById ("category-select").appendChild (opt)
           
        }
    }
    }

const fillDropDownWithdrawal = (data) => {
    let array =[data]

    let dataW = array[0].data.filter (e => e.type.includes ("withdrawal"))
  

   
    let newEntry = document.querySelector ("[data-type=withdrawal]").dataset.type
    
    if (newEntry == "withdrawal"){

        for ( i=0; i<dataW.length;i ++) {            

        let opt = document.createElement ("option")
        opt.textContent = dataW[i].category
        document.getElementById ("category-select-w").appendChild (opt)
     
        }
    }
}
/* const fillDropDownWithdrawal = (data) => {
    let array =[data]

    let dataW = array[0].data.filter (e => e.type.includes ("withdrawal"))
  

   
    let newEntry = document.querySelector ("[data-type=withdrawal]").dataset.type
    
    if (newEntry == "withdrawal"){

        for ( i=0; i<dataW.length;i ++) {            

        let opt = document.createElement ("option")
        opt.textContent = dataW[i].category
        document.getElementById ("category-select-w").appendChild (opt)
     
        }
    }
} */



  
 

 