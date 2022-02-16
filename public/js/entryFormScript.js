const date = document.getElementById ("date")
const category = document.getElementById ("category")
const amount = document.getElementById ("amount")
const formBnt = document.getElementsByClassName ("entryForm_btn")
const form = document.getElementById ("form")
/* console.log (date,category,amount) */
document.addEventListener("DOMContentLoaded", () => {
/*     fetchData(); */
})

form.addEventListener("submit", (e => {
    e.preventDefault ()
    const url = "/entry"
    const data1 = { date: date.value,
                    category: category.value,
                    amount: amount.value * -1,
                    type: "entry"}
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(data1)
    
    }
    
    fetch (url,options)
              
    

} )) 


