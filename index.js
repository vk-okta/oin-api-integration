import express from 'express';
import path from 'path';

import getSystemLogs from './getSystemLogs.js';

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(import.meta.dirname, "views"));


const results = await getSystemLogs();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/dashboard', (req, res) => {
  console.log(results);
  res.render('dashboard', { results });
});
