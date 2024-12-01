const uuidv4 = require('uuid')

let tarefas = [
    {id: '1', nome: 'Aprender React', concluida: true},
    {id: '2', nome: 'Javascript Vanila', concluida: true},
    {id: '3', nome: 'Padrões de projeto', concluida: true},
    {id: '4', nome: 'Type Script', concluida: true},
    {id: '5', nome: 'React Native', concluida: true},
    {id: '6', nome: 'Node com Type Script', concluida: true},
];

function ListarTarefas(req, res) {
    const id = req.params.id
    const tarefa = tarefas.filter((tarefa) => tarefa.id === id)
    console.log(tarefa)
    if (tarefa.length === 0) {
        res.status(404).json({erro: 'Tarefa não encontrada.' })
    }
    res.json(tarefa[0])
}

module.exports = {
    ListarTarefas,
}