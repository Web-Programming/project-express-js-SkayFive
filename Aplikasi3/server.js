// App js
const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk parsing body request
app.use(express.json());

// Serving Static File
app.use(express.static('public'));

app.listen(port, (req, res) => {
  console.log(`server running at http://localhost:${port}`); // pakai backtick
});
