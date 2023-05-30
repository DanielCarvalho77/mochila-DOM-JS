
const form = document.getElementById("novoItem");

form.addEventListener("submit", (evento)=>{
    evento.EventCounts.preventDefault();
    console.log(evento);
})