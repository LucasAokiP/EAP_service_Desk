
async function carregarDados() {
    debugger

    const listaChamadosContainer = document.getElementById('lista-chamados');
    // Adiciona feedback de carregamento no contêiner correto
    if (listaChamadosContainer) {
        listaChamadosContainer.innerHTML = '<div>Carregando chamados...</div>';
    } else {
        console.error('Contêiner #lista-chamados não encontrado.');
        return;
    }
    try {

        const response = await fetch('http://localhost:8000/buscar-chamado');
        if (response.ok) {
            // Acessa os dados do JSON
            const dados = await response.json();
            if (dados && dados.resultado && Array.isArray(dados.resultado)) {
                listaDeChamados = dados.resultado; // Atribui o array à variável de escopo
                console.log('Dados carregados com sucesso:', dados.resultado);
            } else {
                throw new Error('Formato de dados inesperado do servidor.');
            }

        } else {
 
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        console.log(listaDeChamados)
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        if (listaChamados) {
            listaChamadosContainer.innerHTML = `<div style="color: red; padding: 20px;">
                                      Erro ao carregar a lista. Verifique o console.
                                    </div>`;
        }
        return;
    }
    const listaHTML = listaDeChamados.map(chamado => {
        let statusClass = '';
        if (chamado.status === 'Aberto') {
            statusClass = 'status-aberto';
        } else if (chamado.status === 'Em Andamento') {
            statusClass = 'status-andamento';
        } else if (chamado.status === 'Fechado') {
            statusClass = 'status-fechado';
        }
        return `
            <div class="item-usuario${statusClass}">
                <div class="item-detalhes">
                    <strong>Protocolo: ${chamado.protocolo}</strong>
                    <span>Descrição: ${chamado.descricao}</span>
                    <span>Data abertura: ${chamado.data_abertura}</span>
                    <span>Status: ${chamado.status}</span>
                </div>
              
            </div>
        `;
    }).join(''); // O join('') transforma o array de strings HTML em uma única string

    // 3. Injeção no HTML
    if (listaDeChamados.length > 0) {
        listaChamadosContainer.innerHTML = listaHTML;
    } else {
        listaChamadosContainer.innerHTML = '<div style="padding: 15px; color: #777;">Nenhum chamado encontrado.</div>';
    }
}
document.addEventListener('DOMContentLoaded', carregarDados);