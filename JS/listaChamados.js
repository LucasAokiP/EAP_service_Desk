
async function carregarDados() {


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



async function graficoBarras() {
    debugger


    const canvasDash = document.getElementById('canvas-dash');

    if (canvasDash) {
        canvasDash.innerHTML = '<div>Carregando graficos...</div>';
    } else {
        console.error('Contêiner #lista-chamados não encontrado.');
        return;
    }

    const label = [];
    const valores = [];

    try {
        const response = await fetch('http://localhost:8000/contar-chamados');
        if (response.ok) {
            const dados = await response.json();
            resutladoDados = dados.resultado;
            console.log(dados);
            resutladoDados.forEach(dadosChamdosStatus => {
                label.push(dadosChamdosStatus.status);
                valores.push(dadosChamdosStatus.total)
            });
        } else {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao buscar dados para o gráfico:', error);
        ctx.getContext('2d').fillText("Erro ao carregar dados do gráfico.", 10, 50);
        return;
    }






    const ctx = document.getElementById('canvas-dash');


    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: '# of Votes',
                data: valores,
                backgroundColor: [ // Cores para as barras
                    'rgba(255, 99, 132, 0.5)', // Vermelho (Aberto)
                    'rgba(255, 206, 86, 0.5)', // Amarelo (Em Andamento)
                    'rgba(75, 192, 192, 0.5)'  // Verde (Finalizado)
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}
document.addEventListener('DOMContentLoaded', graficoBarras);