/* -------------------------------------INDEX SCRIPT -------------------------------  */
document.addEventListener("DOMContentLoaded", () => {
    fetchData();

})

/* PETICION ALL DATA -----------------------*/
const fetchData= async () => {
    try{
        const res= await fetch ("/balance")
        const data = await res.json()
        fillValues (data)
        totalBalance (data)
        
    }catch (error){
        console.log (error)
    }finally{
        console.log ("finally")
    }
};
/* PETICION INGRESOS ------------------------*/
const fetchEntry = async () => {
    try{
        const res =await fetch ("/entryData")
        const data = await res.json ()
        fillValues (data)
      
    }catch (error){
        console.log (error)
    }finally {
        console.log ("finally entro data ")
    }
}
const entryBtn=document.querySelectorAll("#entry")
console.log (entryBtn)
entryBtn.forEach (e => {
    e.addEventListener ("click", ()=> {
        document.querySelectorAll (".list_table").forEach(e=> e.remove())  

    fetchEntry()  

    })
})

/* PETICION EGRESOS  -------------------------*/
const fetchWithdrawal = async () => {
    try{
        const res =await fetch ("/withdrawalData")
        const data = await res.json ()
        fillValues (data)
    }catch (error){
        console.log (error)
    }finally {
        console.log ("finally entro data ")
    }
}

const withDrawalBtn =document.querySelectorAll("#withdrawal")
withDrawalBtn.forEach (e => {
    e.addEventListener("click", () => {
        document.querySelectorAll (".list_table").forEach(e=> e.remove())  

        fetchWithdrawal()  
      

    })
})
/* withDrawalBtn.addEventListener("click" ,()=> {
    document.querySelectorAll (".list_table").forEach(e=> e.remove())  

    fetchWithdrawal()  
  
}) */
/* -------------------------AUXILIARES----------------------------------------- */


/* MOSTRAR TODOS */
const allTransactions = document.getElementById("all")
console.log (allTransactions)
allTransactions.addEventListener ("click", (e) => {
    document.querySelectorAll (".list_table").forEach(e=> e.remove()) 
    fetchData()
    console.log("apretaron todos")
   
})


const showAll = (data) => {
    let localData={}
    if(data.data.length>10){
        localData=data
      return localData
    }else{
        localData.push (data.data)
      return  localData
    }
}

/* BALANCE TOTAL ---> trae el balance total */ 
const totalBalance =  (data) => {
    let contador = 0
    for(i=0; i<data.data.length; i++){
        
        contador = contador + data.data[i].amount  
    }
    
    document.getElementById("total").textContent= "$ " + contador
}
function reverseDate(str) {
    return str.split (["-"],[3]).reverse().join("-")
}


/* FILAS TABLA ---> POPULATE*/

const fillValues = (data) => {
    
    const balance =document.getElementById ("balance")
    const templateRow = document.getElementById ("template-row").content
    const fragment = document.createDocumentFragment()
    console.log (data.data[0].category.category)

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




 