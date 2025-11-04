const tipoChamado = document.getElementById("form-chamado");
const descricao = document.getElementById("form-descricao");
const anexo = document.getElementById("anexo");
const formChamado = document.getElementById("form-chamado");

formChamado.addEventListener('submit', function(e){
    if (!tipoChamado.value || !descricao.value){
        alert("Por favor, preencha todos os campos!");
        e.preventDefault();
        return;
    }
});