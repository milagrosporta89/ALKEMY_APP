
const alert = amount.nextElementSibling
const form = document.getElementById("form")
const btn = document.getElementById("btn")
console.log (btn)


const isEmpty = (field) =>{
    return field.value.trim ().length ===0
}


form.addEventListener ("submit", (e) => {
    e.preventDefault();
   

    let contador= []
    if (isEmpty(amount)==true){

        alert.innerHTML = "Completa el monto"
        alert.classList.add ("danger")
        contador.push ("Fecha vacia")
    }
    
    if (isNaN(amount.value)==true){

        alert.innerHTML = "Debes ingresar un numero"
        alert.classList.add ("danger")
        contador.push ("dato invalido")
    }
    if (amount.value < 0){
        alert.innerHTML = "Ingresa un numero positivo"
        alert.classList.add ("danger")
        contador.push ("dato invalido")

    }
    if (contador.length == 0){
    
        window.alert ("Monto ingresado")
        
        form.submit()
        }
    
    
})
