import express from 'express';
import path from 'path';

import getSystemLogs from './getSystemLogs.js';

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

let connectionData = {};

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/dashboard', async (req, res) => {
  if (Object.keys(connectionData).length <= 0) {
    res.render('error', { message: 'You need to save the details to continue.' });
    return;
  }

  const results = await getSystemLogs();
  res.render('dashboard', { results });
});

app.get('/save-details', (req, res) => {
  res.render('saveCreds');
});

app.post('/submit', (req, res) => {
  connectionData = { ...req.body };

  console.log(connectionData);

  res.redirect('/');
});
