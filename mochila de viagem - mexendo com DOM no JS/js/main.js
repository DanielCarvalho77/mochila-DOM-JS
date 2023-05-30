const form = document.getElementById("novoItem");
const itens = JSON.parse(localStorage.getItem("itens")) || [];
//cria uma const, que vai receber a list pelo id, tag ul
const lista = document.getElementById("lista");

//pegando os itens que tem no localStorage
itens.forEach((elemento) => {
    criaElemento(elemento);
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length-1]).id + 1 : 0;
        criaElemento(itemAtual);

        //inserindo dadod no array
        itens.push(itemAtual);
    }

    //Salvando no localStorage
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})

//função para colocar um elemento html na página
function criaElemento(item) {
    //cria elemento pegando pela tag li
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");
    //cria pela tag strong
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    //cria elemento um dentro do outro
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    
    //Aqui temos pegamos o id para passar como parêmetro na funcção botaoDeleta()
    novoItem.appendChild(botaoDeleta(item.id));
    //seta a lista na página
    lista.appendChild(novoItem);
    //Criando objeto para salvar no localStorage
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

//Aqui recebe o id para que seja possível também passar o id, quando chamar a função deletaElemento
function botaoDeleta (id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click",function(){
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
}


function deletaElemento(tag, id){
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id),1);

    localStorage.stringify;
}


