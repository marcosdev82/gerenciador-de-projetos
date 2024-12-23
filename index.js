const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Libera acessos de domínios diferentes

const  { 
  ListarTarefasId, 
  ListarTarefas, 
  cadastrarTarefa, 
  atualizarTarefa, 
  removerTarefa,
  concluirTarefa
}  = require('./controllers/gerenciador-tarefas')


const app = express();
const port = 4000;

// Configuração do middleware
app.use(cors({ credentials: true, origin: '*' }));
app.use(bodyParser.json());

// Função para resposta "Não implementado"
const naoImplementado = (req, res) => {
  res.status(501).json({ erro: 'Não implementado' });
};

// Rotas
app.get('/gerenciador-tarefas', ListarTarefas); // Listar todas as tarefas
app.get('/gerenciador-tarefas/:id', ListarTarefasId ); // Listar tarefa por ID
app.post('/gerenciador-tarefas', cadastrarTarefa); // Cadastrar tarefa
app.put('/gerenciador-tarefas/:id', atualizarTarefa); // Atualizar tarefa
app.delete('/gerenciador-tarefas/:id', removerTarefa); // Deletar tarefa
app.put('/gerenciador-tarefas/:id/concluir', concluirTarefa); // Concluir tarefa

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor inicializado na porta ${port}`);
}).on('error', (err) => {
  console.error(`Erro ao iniciar o servidor: ${err.message}`);
});
