import express from 'express';
import path from 'path';

import getSystemLogs from './getSystemLogs.js';
import prisma from './src/config/db.js';

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
  try {
    if (Object.keys(connectionData).length <= 0) {
      // res.render('error', { message: 'You need to save the details to continue.' });
      // return;
    }

    const results = await getSystemLogs({ connectionData });

    res.render('dashboard', { results });
  } catch (error) {
    console.log(error);
    res.redirect('/error');
  }
});

app.get('/save-details', (req, res) => {
  res.render('saveCreds');
});

app.post('/submit', async (req, res) => {
  connectionData = { ...req.body };

  const savedOrg = await prisma.org.create({
    data: {
      domain,
      client_id,
      client_secret,
      kid,
      pem,
    },
  });

  console.log('Saved to DB:', savedOrg);

  res.redirect('/');
});

app.get('/error', (req, res) => {
  res.render('error');
});
