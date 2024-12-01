const { v4: uuidv4 } = require('uuid'); // Corrigido para usar a sintaxe correta para `uuid`

let tarefas = [
    { id: '1', nome: 'Aprender React', concluida: true },
    { id: '2', nome: 'Javascript Vanila', concluida: true },
    { id: '3', nome: 'Padrões de projeto', concluida: true },
    { id: '4', nome: 'Type Script', concluida: true },
    { id: '5', nome: 'React Native', concluida: true },
    { id: '6', nome: 'Node com Type Script', concluida: true },
];

function ListarTarefasId(req, res) {
    const id = req.params.id;
    const tarefa = tarefas.find((tarefa) => tarefa.id === id); // `find` é mais apropriado aqui
    console.log(tarefa);
    if (!tarefa) { // Checar diretamente se a tarefa não existe
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }
    res.json(tarefa);
}

function ListarTarefas(req, res) {
    const pagina = parseInt(req.query['pag'], 10) || 1; // Converter para número
    const ordem = req.query['ordem']; // ASC, DESC
    const filtroTarefa = req.query['filtro-tarefa'];
    const itensPorPagina = parseInt(req.query['itens-por-pagina'], 10) || 3; // Converter para número
    let tarefasRetornar = [...tarefas]; // Copiar o array corretamente

    // Filtrar
    if (filtroTarefa) {
        tarefasRetornar = tarefasRetornar.filter(
            t => t.nome.toLowerCase().includes(filtroTarefa.toLowerCase()) // Corrigido o uso de `includes`
        );
    }

    // Ordenar
    if (ordem === 'ASC') {
        tarefasRetornar.sort((t1, t2) => t1.nome.toLowerCase().localeCompare(t2.nome.toLowerCase()));
    } else if (ordem === 'DESC') {
        tarefasRetornar.sort((t1, t2) => t2.nome.toLowerCase().localeCompare(t1.nome.toLowerCase()));
    }

    // Paginação
    const totalItens = tarefasRetornar.length;
    const startIndex = (pagina - 1) * itensPorPagina;
    const tarefasPaginadas = tarefasRetornar.slice(startIndex, startIndex + itensPorPagina);

    // Retornar
    res.json({
        totalItens,
        tarefas: tarefasPaginadas,
        pagina,
    });
}

module.exports = {
    ListarTarefasId,
    ListarTarefas,
};
