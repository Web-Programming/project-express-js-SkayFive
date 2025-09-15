// App js
const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk parsing body request
app.use(express.json());

// Route GET
app.get('/', (req, res) => {
  res.send('Hello, GET request!');
});

// Route POST
app.post('/submit', (req, res) => {
  const { name } = req.body;
  res.send(`Hello, ${name}!`); // pakai backtick
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}/index.html`); // pakai backtick
});
