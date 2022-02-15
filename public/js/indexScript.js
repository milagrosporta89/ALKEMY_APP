document.addEventListener("DOMContentLoaded", () => {
    fetchData();
})
/* PETICION */
const fetchData= async () => {
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
/* FILAS TABLA */
const fillValues = (data) => {
    const balance =document.getElementById ("balance")
    const templateRow = document.getElementById ("template-row").content
    const fragment = document.createDocumentFragment()

    for (let i=0; i<10 ; i++){
        const clone = templateRow.cloneNode(true)
        clone.querySelector("#date").textContent = data[i].date
        clone.querySelector("#category").textContent = data[i].category
        clone.querySelector("#amount").textContent = "$ " + data[i].amount
        console.log("estoy")
     fragment.appendChild (clone)
    }
   
 balance.appendChild (fragment)

    
}
 