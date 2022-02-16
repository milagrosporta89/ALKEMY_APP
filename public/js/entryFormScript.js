document.addEventListener("DOMContentLoaded", () => {
fetchBalance ()})


const date = document.getElementById ("date")
const category = document.getElementById ("category")
const amount = document.getElementById ("amount")
const formBnt = document.getElementsByClassName ("entryForm_btn")
const form = document.getElementById ("form")
/* console.log (date,category,amount) */
const fetchBalance= async () => {
    try{
        const res= await fetch ("/balance")
        const data = await res.json()
        fillValues (data)
    }catch (error){
        console.log (error)
    }finally{
        console.log ("finally")
    }
};

function fillValues (data){
    console.log (data.data[2].total)
}
console.log ()

/* const totalBalance = fetch("/balance")
        .then(response => response.json()
        .then (data => console.log (data))
        .catch (error => console.log (error))
)
console.log ("fecth") */

form.addEventListener("submit", (e => {
    e.preventDefault ()
    const url = "/entry"
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
    })) 
        
    

