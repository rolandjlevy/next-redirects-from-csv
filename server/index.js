const express = require('express');
const next = require('next');
const PORT = process.env.PORT || 4040;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get('/hello', (req, res) => {
      return res.json({ message: 'Hello world' });
    });
    server.get('*', (req, res) => handle(req, res));
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });