const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/:nome', (req, res) => {
  const { nome } = req.params;
  res.json({ msg: `teste ${nome}` });
});

app.listen(port, () => {
  console.log(`Server Running at Port: ${port}`);
});
