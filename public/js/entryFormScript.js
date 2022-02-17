document.addEventListener("DOMContentLoaded", () => {
fetchData ()})


const date = document.getElementById ("date")
const category = document.getElementById ("category")
const amount = document.getElementById ("amount")
const formBnt = document.getElementsByClassName ("entryForm_btn")
const form = document.getElementById ("form")

/* CAPTURAR ID PARA HACER BUSQUEDA */

let url = window.location.href.split ("/")
const id =url[url.length -1]

/* ENVIO POR POST DE DATOS DE FORMULARIO */
/* PETICION */
const fetchData= async () => {
    try{
        const res= await fetch ("/balance")
        const data = await res.json()
        editValues (data)
        console.log (data)
      
    }catch (error){
        console.log (error)
    }
};

/* INSERTAR VALORES DE BUSQUEDA EN INPUT DE FORUMARIO */

const editValues = (info) => {

    for (i=0; i<info.data.length; i++){
        if (info.data[i].id ==id) {
            category.value= info.data[i].category
            date.value = info.data[i].date
            amount.value = info.data[i].amount
        }
    }
}








/* form.addEventListener("submit", (e => {
    e.preventDefault ()
    const url = "/entryData"
    const data1 =   { 
                    date: date.value,
                    category: category.value,
                    amount: amount.value,
                    type: "entry"
                    }

    const options = {
                    method: "POST",
                    headers: {
                    'Content-Type': 'application/json'},
                    body: JSON.stringify(data1)
                    }
            
    fetch (url,options)                                
    }))  */
        