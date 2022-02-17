

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
console.log (reverseDate ("22-11-2020"))

/* FILAS TABLA ---> crea las filas  */
const fillValues = (data) => {
    const balance =document.getElementById ("balance")
    const templateRow = document.getElementById ("template-row").content
    const fragment = document.createDocumentFragment()

    for (let i=0; i<10 ; i++){//hacer un if que si data.data.length es menor a 10 el for se ejecute con .length y si no que sea 10 
        const clone = templateRow.cloneNode(true)
        clone.querySelector("#date").textContent =reverseDate (data.data[i].date)
        clone.querySelector("#category").textContent =  "  |  " +  data.data[i].category
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


 