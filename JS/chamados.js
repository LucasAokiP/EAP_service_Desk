

const formChamado = document.getElementById('form-chamado')

if (formChamado) {

    const assunto = document.getElementById('input-assunto')
    const descricao = document.getElementById('descricao')
    const dropdown = document.getElementById('topico')
    const anexo = document.getElementById('anexo')
    const btnEnviarTicket = document.getElementById('btn-enviar-ticket')


    if (document.getElementById('alta')) {
        var prioridade = document.getElementById('alta')
    } else if (document.getElementById('media')) {
        var prioridade = document.getElementById('media')

    } else if (document.getElementById('baixa')) {
        var prioridade = document.getElementById('baixa')
    } else {
        console.error('Elemento não encontrado (prioridade)')
    }


    formChamado.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dadosChamados = {
            assunto: assunto.value,
            descricao: descricao.value,
            dropdown: dropdown.value,
            prioridade: prioridade.value
        }

        const arquivoAnexo = anexo.value
        if (assunto === '' || descricao === '' || dropdown === '' || prioridade === '') {
            feedback.textContent = 'Por favor, preencha todos os campos!';
            feedback.className = 'mt-4 text-center text-red-500 font-bold';
            return;
        }

        btnEnviarTicket.disabled = true;
        btnLogin.textContent = 'Enviando...';
        feedback.textContent = 'Processando a abertura do chamado. Aguarde...';
        feedback.className = 'mt-4 text-center text-blue-600';

    })
}