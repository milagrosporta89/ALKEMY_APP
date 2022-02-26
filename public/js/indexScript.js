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
        editBtnEvent(data)

       
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
        clone.querySelector("#edit-btn").setAttribute ("data-id", data.data[i].id) 
   /*      clone.querySelector("#edit-btn").setAttribute ("href", "/edit/" + data.data[i].id)  */
        if(data.data[i].amount < 0){
            clone.querySelector("#amount").classList.add ("negative")
        }else{
            clone.querySelector("#amount").classList.add ("positive")
        }
        fragment.appendChild (clone)
    }
    
    balance.appendChild (fragment)
    
    
}
/*EDIT FORM  ---- COMPLETAR CAMPOS CON INFO DE DATA SEGUN ID*/
const dateEdit = document.getElementById ("dateEdit")
const categoryEdit = document.getElementById ("categoryEdit")
const amountEdit = document.getElementById ("amountEdit")
const storedData = JSON.parse (localStorage.getItem ("category"))

const editBtnEvent = (data) => {
    const editEvent = document.querySelectorAll (".edit_btn")
    editEvent.forEach (e =>{ 
                e.addEventListener("click", ()=> {
                    document.getElementById ("edit-modal").classList.add("show")
                    
                    let idInfo= e.getAttribute("data-id")        
                    let filteredData = data.data.filter (e => e.id ==idInfo)  
                    let optionsArray= storedData.data.filter (e=>e.type == filteredData[0].type)
                    optionsArray.forEach ((e)=> {
                        
                                let opt = document.createElement ("option")
                                opt.textContent = e.category
                                opt.classList.add("allCategories")
                                document.getElementById ("categoryEdit").appendChild (opt)
                                    
                    }) 

                    dateEdit.value = filteredData[0].date
                    categoryEdit.value = filteredData[0].category.category
                    amountEdit.value = filteredData[0].amount
                    localStorage.setItem ("idEdit",filteredData[0].id)   
         

            })
        })
        

}
/* ENVIO ACTUALIZAR DE FORMULARIO DE EDICION  */
const updateData = document.getElementById ("update-btn")

updateData.addEventListener ("click", (e) =>  {
    e.preventDefault ()
    let id= localStorage.getItem ("idEdit")
    const data1 =   { 
        id: localStorage.getItem ("idEdit"),
        date: dateEdit.value,
        category: categoryEdit.value,
        amount: amountEdit.value,
        }

    const endpoint2= `/edit/${id}`;
    
    fetch (endpoint2,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(data1)

    })
    .then(response => response.json())    
    .then(data => window.location.href = data.redirect)
    .catch(error => console.log (error))
 
  })
  /* ENVIO ELIMINAR ENTRADA  */
const deleteData= document.getElementById("delete-btn")

deleteData.addEventListener("click", (e)=>{
    console.log ("soy delet btn")
    e.preventDefault ()
    let id= localStorage.getItem ("idEdit")
    const endpoint= `/edit/${id}`;
    fetch(endpoint, {
        method: "DELETE"
    })
    .then(response => response.json())    
    .then(data => window.location.href = data.redirect)
    .catch(error => console.log (error))
})
  /* CERRAR FORMULARIO DE EDICION */
 const closeBtn =  document.getElementById ("close")

     closeBtn.addEventListener ("click", e => {   
         document.getElementById ("edit-modal").classList.remove("show")

 })
    

 /* MODAL ENTRY-BTN */
 const entryModalTrigger = document.getElementById ("entry_btn")
 const widgetBar = document.getElementById ("widget-modal")
 const entryModal = document.getElementById ("entry-modal")
 const entryModalClose= document.getElementById ("entry-modal--close")
 const withdrawalModal = document.getElementById ("withdrawal-modal")
 const withdrawalModalClose = document.getElementById ("withdrawal-modal--close")
 

entryModalTrigger.addEventListener ("click", e=> {

            widgetBar.classList.add ("edition","modal-widget","show")
            entryModal.getElementsByTagName ("button")[0].classList.remove ("hide")
            entryModal.classList.add("edition")
            withdrawalModal.classList.add ("hide")
 })
 entryModalClose.addEventListener ("click", e => {
     widgetBar.classList.remove("show","edition","modal-widget")
     entryModal.classList.remove ("edition")
     withdrawalModal.classList.remove ("hide")
 })
 /* MODAL WITHDRAWAL-BTN */
 const withdrawalModalTrigger = document.getElementById ("withdrawal_btn")
 withdrawalModalTrigger.addEventListener ("click", e=> {
    widgetBar.classList.add ("edition","modal-widget","show")
    withdrawalModal.getElementsByTagName ("button")[0].classList.remove ("hide")
    withdrawalModal.classList.add("edition")
    entryModal.classList.add ("hide")
 })
 withdrawalModalClose.addEventListener ("click", e => {
    widgetBar.classList.remove("show","edition","modal-widget")
    withdrawalModal.classList.remove ("edition")
    entryModal.classList.remove("hide")
})