/* -------------------------------------INDEX SCRIPT -------------------------------  */
document.addEventListener("DOMContentLoaded", () => {
    fetchCategory();

})

/* PETICION ALL DATA -----------------------*/
const fetchCategory= async () => {
    try{
        const res= await fetch ("/category")
        const data = await res.json()
        fillDropDown (data)


        
    }catch (error){
        console.log (error)
    }finally{
        console.log ("finally")
    }
};
/* PETICION INGRESOS ------------------------*/

/* PETICION EGRESOS  -------------------------*/

/* -------------------------AUXILIARES----------------------------------------- */


/* MOSTRAR TODOS */

/* BALANCE TOTAL ---> trae el balance total */ 



/* FILAS TABLA ---> POPULATE*/

const fillValues = (data) => {
    
    const balance =document.getElementById ("balance")
    const templateRow = document.getElementById ("template-row").content
    const fragment = document.createDocumentFragment()

    let info = 0
    if (data.data.length>10){
       info = 10
    }else{
        info = data.data.length
    }

    for (let i=0; i<info ; i++){
        const clone = templateRow.cloneNode(true)
        clone.querySelector("#date").textContent =reverseDate (data.data[i].date)
        clone.querySelector("#category").textContent =  "  |  " +  data.data[i].category.category
        clone.querySelector("#amount").textContent = "$ " + data.data[i].amount
        clone.querySelector("#edit-btn").setAttribute ("href", "/edit/" + data.data[i].id)
        if(data.data[i].amount < 0){
            clone.querySelector("#amount").classList.add ("negative")
        }else{
            clone.querySelector("#amount").classList.add ("positive")
        }
        fragment.appendChild (clone)
    }
    
    balance.appendChild (fragment)
    
    
}
/* DROPDOWN MENU */
/* const fillDropDown = (data) => {
    for (let i=0; i<data.data.length; i++){

        let dropdown =document.getElementById ("dropdown")
        let templateDrop= document.getElementById ("#categoryOption").content
        let fragmentDrop = document.createDocumentFragment()
        let clone = templateDrop.cloneNode (true) 
        clone.querySelector("#categoryOption").setContent = data[i].id
        fragmentDrop.appendChild (clone)
    }
} */
 const fillDropDown = (data) => {
     let array =[data]
     console.log (array)
     let dataW = array[0].data.filter (e => e.type.includes ("withdrawal"))
     let dataE = array[0].data.filter (e => e.type.includes ("entry"))
     console.log (dataW)
     console.log (dataE[0].category)
     let newEntry = document.querySelector (".entryForm_title").dataset.type
     console.log ("soy " + newEntry)
  
     
     if (newEntry == "entry"){

                 for ( i=0; i<dataE.length;i ++) {            
        
                    let opt = document.createElement ("option")
                    opt.textContent = dataE[i].category
                    document.getElementById ("category-select").appendChild (opt)
            console.log (dataE[i].category)
        }
    }else{
            for ( i=0; i<dataW.length;i ++) {            
        
            let opt = document.createElement ("option")
            opt.textContent = dataE[i].category
            document.getElementById ("category-select").appendChild (opt)
            console.log (dataW[i].category)
            }


 }
}
    
  
 

 