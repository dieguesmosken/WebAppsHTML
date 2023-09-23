const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/consultar-app-id', async (req, res) => {
  const { appId } = req.body;
  const apiUrl = `https://bspmts.mp.microsoft.com/v1/public/catalog/Retail/Products/${appId}/applockerdata`;

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      res.status(response.status).json({ error: 'Erro ao consultar a API' });
    }
  } catch (error) {
    console.error('Erro ao consultar a API:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
