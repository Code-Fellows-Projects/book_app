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
app.post('/searches', createSearch);
app.get('/pages/error', renderError);


function renderHomePage(req, res) {
  res.render('pages/index');
}

function showForm(req, res) {
  res.render('pages/searches/new.ejs');
}

function renderError(req, res) {
  res.render('pages/error');
}

function createSearch(req, res) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  if (req.body.search[1] === 'title') { url += `+intitle:${req.body.search[0]}`; }
  if (req.body.search[1] === 'author') { url += `+inauthor:${req.body.search[0]}`; }

  console.log(url);
  superagent.get(url)
    .then(data => {
      console.log(data);
      return data.body.items.map(book => {
        return new Book(book.volumeInfo);
      });
    })
    .then(results => {
      res.render('pages/searches/show.ejs', { searchResults: JSON.stringify(results) });
    })
    .catch(err => {
      res.render('pages/error', err);
    });
}

function Book(info) {
  this.image = info.imageLinks.thumbnail;
  this.title = info.title || 'No title available.';
  this.author = info.authors || 'No Author Listed';
  this.description = info.description || 'No Description Provided';
}

app.listen(PORT, () => {
  console.log(`server up on ${PORT}`);
});
