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
        categoryFilter (data)
        populateEntry(data)
        populateWithdrowal (data)
        populateAll(data)
       
    }catch (error){
        console.log (error)
    }finally{
        console.log ("finally")
    }
};
/* FILTRO BOTON INGRESOS */
const populateEntry = (data) => {

    const entryBtn=document.querySelectorAll("#entry")

    entryBtn.forEach (e => {
        e.addEventListener ("click", ()=> {
        document.querySelectorAll (".list_table").forEach(e=> e.remove())  

        let entry=  {data: data.data.filter (e => e.type == "entry")}
        fillValues(entry)

    })
})

}
/* FILTRO BOTON GASTOS */
const populateWithdrowal = (data) => {
   
    const withDrawalBtn =document.querySelectorAll("#withdrawal")

    withDrawalBtn.forEach (e => {
        e.addEventListener("click", () => {
            document.querySelectorAll (".list_table").forEach(e=> e.remove())  
            let withdrawal= {data: data.data.filter (e => e.type == "withdrawal")}
            fillValues(withdrawal)   
        })
    })  
}


/* MOSTRAR TODOS */

const populateAll= (data) => {

    const allTransactions = document.querySelectorAll("#all")
    
    allTransactions.forEach (e => {
        e.addEventListener ("click" , ()=> {
            document.querySelectorAll (".list_table").forEach(e=> e.remove())  
            fillValues(data)
        })
    })
 
}

/* BALANCE TOTAL ---> trae el balance total */ 
const totalBalance =  (data) => {
    let contador = 0
    for(i=0; i<data.data.length; i++){
        
        contador = contador + data.data[i].amount  
    }
    
    document.getElementById("total").textContent= "$ " + contador
}

/* BUSQUEDA SEGUN FILTRO */

const categoryFilter = (data) => {

    let filterBtn = document.getElementById ("filter-btn")  
    filterBtn.addEventListener ("click", ()=>{
        let typeDropdown = document.getElementById ("type-dropdown").value
        let categoryDropdown = document.getElementById ("category-filter")
        let categoryOption = categoryDropdown.options [categoryDropdown.selectedIndex].text
        let filteredData = {data :data.data.filter (e => e.category.type == typeDropdown && e.category.category == categoryOption)}
        document.querySelectorAll (".list_table").forEach(e=> e.remove()) 
        fillValues (filteredData)
    })

}


/* FILAS TABLA ---> POPULATE*/
function reverseDate(str) {
    return str.split (["-"],[3]).reverse().join("-")
}

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

