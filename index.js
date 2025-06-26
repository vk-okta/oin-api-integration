import express from 'express';
import path from 'path';

import getSystemLogs from './getSystemLogs.js';

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

const results = await getSystemLogs();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/dashboard', (req, res) => {
  console.log(results);
  res.render('dashboard', { results });
});

app.get('/save-details', (req, res) => {
  res.render('saveCreds');
});

app.post('/submit', (req, res) => {
  const { orgDomain } = req.body;
  console.log(orgDomain);
  // console.log('Received inputs:', input1, input2, input3);

  res.redirect('/');
});
