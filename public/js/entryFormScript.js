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
        typeDropdown (data)
        localStorage.setItem ("category", JSON.stringify (data))

        
    }catch (error){
        console.log (error)
    }
};
/* POPULATE SELECT CATEGORY INGRESOS */
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
/* POPULATE SELECT CATEGORY GASTOS  */
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
/* POPULATE SELECT SEGUN TIPO */

const typeDropdown = (data) =>{
    let categoryType=document.getElementById ("type-dropdown")
    categoryType.addEventListener ("change",(e)=> {

        let dataW = data.data.filter(e => e.type.includes ("withdrawal"))
        let dataE = data.data.filter(e => e.type.includes ("entry"))
       
        
        document.querySelectorAll (".allCategories").forEach(e=> e.remove())
        if (categoryType.value == "entry") {
            dataE.forEach ((e , i) => {
      
                let opt = document.createElement ("option")
                opt.textContent = e.category
                opt.classList.add("allCategories")
                document.getElementById ("category-filter").appendChild (opt)
                    }
                    )
         
        }else{dataW.forEach ((e , i) => {
      
            let opt = document.createElement ("option")
            opt.textContent = e.category
            opt.classList.add("allCategories")
            document.getElementById ("category-filter").appendChild (opt)
                }
                )
        }            
})
}



  
 

 