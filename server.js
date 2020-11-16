'use strict';

const express = require('express');
const app = express();
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', renderHomePage);

app.get('/searches/new', showForm);
// app.post('/searches', createSearch);

function renderHomePage(req, res) {
  res.render('pages/index');
}

function showForm(req, res) {
  res.render('pages/searches/new.ejs');
}

// function createSearch (req,res){
//   let url = 'https://www.googleapis.com/books/v1/volumes?q=';
//   if ()
// }

app.listen(PORT, () => {
  console.log(`server up on ${PORT}`);
});
