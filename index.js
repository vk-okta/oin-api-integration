import express from 'express';
import path from 'path';
import { PrismaClient } from '@prisma/client';

import getSystemLogs from './getSystemLogs.js';

const app = express();
const port = 8080;
const prisma = new PrismaClient();

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

let connectionData = {};

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', async (req, res) => {
  try {
    const creds = await prisma.oktaCredential.findFirst({
      where: { orgDomain: 'https://vivek-giri.oktapreview.com' },
    });

    res.render('home', { creds: creds || {} });
  } catch (error) {
    console.error('Error fetching creds:', error);
    res.status(500).send('Internal Server Error');
  }
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
  const { orgDomain, clientID, clientSecret, kid, pem } = req.body;

  try {
    const saved = await prisma.oktaCredential.create({
      data: {
        orgDomain,
        clientID,
        clientSecret,
        kid,
        pem,
      },
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving data.');
  }
});

app.get('/error', (req, res) => {
  res.render('error');
});
