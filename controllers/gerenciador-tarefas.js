const { v4: uuidv4 } = require('uuid');

let tarefas = [
    {id: 1, nome: 'Aprender React', concluida: true},
    {id: 2, nome: 'Javascript Vanila', concluida: true},
    {id: 3, nome: 'Padrões de projeto', concluida: true},
    {id: 4, nome: 'Type Script', concluida: true},
    {id: 5, nome: 'React Native', concluida: true},
    {id: 7, nome: 'CRUD em node', concluida: true},
    {id: 8, nome: 'Laravel 11', concluida: true},
    {id: 9, nome: 'MongoDB', concluida: true},
    {id: 10, nome: 'TypeORM', concluida: true},
];

function ListarTarefasId(req, res) {
    const id = req.params.id
    const tarefa = tarefas.filter((tarefa) => tarefa.id === id)
 
    if (tarefa.length === 0) {
        res.status(404).json({erro: 'Tarefa não encontrada.' })
    }
    res.json(tarefa[0])
}

function ListarTarefas(req, res) {
    const pagina = parseInt(req.query['pag'], 10) || 1;
    const ordem = req.query['ordem'] // ASC, DESC
    const filtroTarefa = req.query['filtro-tarefa']
    const itemPorPagina = parseInt(req.query['itens-por-pagina'], 10) || 3;
    let tarefasRetornar = tarefas.slice(0)
    
    // filtrar - analisar lógica
    if (filtroTarefa) {
        tarefasRetornar = tarefasRetornar.filter(
            t => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
        )
    }

    // ordenar
    if (ordem === 'ASC') {
        tarefasRetornar.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1)
    } else if (ordem === 'DESC') {
        tarefasRetornar.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1)
    }

    // retornar
    res.json({
        totalItems: tarefasRetornar.length,
        tarefas: tarefasRetornar.slice(0).splice((pagina - 1) * itemPorPagina, itemPorPagina),
        pagina: pagina
    })
}

function cadastrarTarefa(req, res) {
   
    if (!req.body['nome'] && !req.body['concluida']) {
        res.status(400).json({ erro: 'Requisição inválida.' });
        return; // Adicione para evitar que a execução continue após o erro
    }
    const tarefa = {
        id: uuidv4(),
        nome: req.body['nome'],
        concluida: req.body['concluida']
    };
    tarefas.push(tarefa);
    res.json(tarefas);
}

function atualizarTarefa(req, res) {

    if (!req.body['nome'] && !req.body['concluida']) {
        res.status(400).json({ erro: 'Requisição inválida.' });
        return; // Adicione para evitar que a execução continue após o erro
    }

    const id = req.params.id
    let tarefaAtualizada = false

    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.nome = req.body['nome']
            tarefa.concluida = req.body['concluida']
            tarefaAtualizada = true
        }
        return tarefa;
    });

    if (!tarefaAtualizada) {
        res.status(404).json({erro: 'Tarefa não encontrada.'});
    }

    res.json({
        id: id,
        nome: req.body['nome'],
        consluida: req.body['concluida']
    })

}

function removerTarefa(req, res) {
    const id =  req.params.id;
    const numTarefas = tarefas.length;

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
   
    if (numTarefas === tarefas.length) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }
    res.json({ msg: 'Tarefa removida com sucesso!' });
}

function concluirTrefa(req, res) {
    const id = req.params.id;
    let tarefaConcluida = false;
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.concluida = true;
            tarefaConcluida = true;
        }
        return tarefa;
    })
    if (!tarefaConcluida) {
        res.status(404).json({erro: 'Trefa não encontrada.'});
        res.json({msg: 'Tarefa concluída com sucesso!'});
    }
}


module.exports = {
    ListarTarefasId,
    ListarTarefas,
    cadastrarTarefa,
    atualizarTarefa,
    removerTarefa,
    concluirTrefa
}