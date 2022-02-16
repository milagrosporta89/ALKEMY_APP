document.addEventListener("DOMContentLoaded", () => {
    fetchData();
})
/* PETICION */
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
/* BALANCE TOTAL */
const totalBalance =  (data) => {
    let contador = 0
    for(i=0; i<data.data.length; i++){

      contador = contador + data.data[i].amount  
    }
    
    document.getElementById("total").textContent= "$ " + contador
}

/* FILAS TABLA */
const fillValues = (data) => {
    const balance =document.getElementById ("balance")
    const templateRow = document.getElementById ("template-row").content
    const fragment = document.createDocumentFragment()

    for (let i=0; i<10 ; i++){
        const clone = templateRow.cloneNode(true)
        clone.querySelector("#date").textContent = data.data[i].date
        clone.querySelector("#category").textContent = data.data[i].category
        clone.querySelector("#amount").textContent = "$ " + data.data[i].amount
        console.log("estoy")
     fragment.appendChild (clone)
    }
   
 balance.appendChild (fragment)

    
}
 