const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Libera acessos de domínios diferentes

const app = express();
const port = 3000;

// Configuração do middleware
app.use(cors({ credentials: true, origin: '*' }));
app.use(bodyParser.json());

function naoImplementado(req, res) {
    res.status(501).json({ erro: 'Não implementado' });
}

// Rota para listar todas as tarefas
app.get('/gerenciador-tarefas', (req, res) => naoImplementado);
// Rota para listar tarefas por ID
app.get('/gerenciador-tarefas/:id', (req, res) => naoImplementado);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor inicializado na porta ${port}`);
}).on('error', (err) => {
  console.error(`Erro ao iniciar o servidor: ${err.message}`);
});
