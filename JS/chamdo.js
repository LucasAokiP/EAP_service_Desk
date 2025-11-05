const tipoChamado = document.getElementById("topico");
const descricao = document.getElementById("descricao");
const anexo = document.getElementById("anexo");
const formChamado = document.getElementById("form-chamado");

formChamado.addEventListener('submit', function(e){
    if (!tipoChamado.value || !descricao.value){
        alert("Por favor, preencha todos os campos!");
        e.preventDefault();
        return;
    }
    else{
        alert("Chamado criado com sucesso!");
        window.location.href = "../Pages/gerenciarChamado.html";
    }

});