const date = document.getElementsByTagName ("date")
const category = document.getElementsByTagName ("category")
const amount = document.getElementsByTagName ("amount")
const formBnt = document.getElementsByClassName ("entryForm_btn")
const form = document.getElementByid ("form")
console.log (date,category,amount)
document.addEventListener("DOMContentLoaded", () => {
/*     fetchData(); */
})
form.addEventListener("submit", (e => {
    e.preventDefault ()





} ))
const url = "/balance"
const formData = {
    
}
const save = fetch (url)
            .then(response => response.json())
            .then(data => console.log(data));
console.log (save)