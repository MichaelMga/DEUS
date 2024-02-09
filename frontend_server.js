const express = require('express');
const app = express();
const port = 3001;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.static('assets'));

app.get('/', (req, res) => {
  handleRequest(req, res);
});

app.get('/:page', (req, res) => {
  handleRequest(req, res);
});

const handleRequest = (req, res) => {
  const page  = req.url === '/' ? 'home' : req.params.page;
  const title = 'Express Page';

  console.log(page);

  // Render the view corresponding to the URL path
  res.render(page, { title });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
