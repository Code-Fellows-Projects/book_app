'use strict';

const express = require('express');
const app = express();
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', renderHomePage);

function renderHomePage(req, res) {
  res.render('pages/index');
}

app.listen(PORT, () => {
  console.log(`server up on ${PORT}`);
});
