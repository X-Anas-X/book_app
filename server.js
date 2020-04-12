'use strict';
// request enviroment
require('dotenv').config();


//******************************************************* dependencies ***************************************************************\\


// require the dependencies
const express = require('express');
const superagent = require('superagent');
const PORT = process.env.PORT || 4000;
const app = express();


app.set('view engine', 'ejs'); //this is for the html pages after installing it from the terminal
app.use(express.static('./publics')); // the static css folders

app.use(express.urlencoded({ extended: true })); // to get the data from the form


//******************************************************* rendering pages **************************************************************\\

// rendering the html page
app.get('/searches/new', (req, res)=>{
//   console.log('this is getting from', req.query);
  res.render('pages/searches/new');
});
app.get('/hello', (req, res)=>{
  res.render('pages/index');
});


//******************************************************* rendering superagent API *******************************************************\\

// using post to render the url
app.post('/incoming', (req, res) =>{

  let url; // declarinf the url variable to use it in the if statement
  let newbookArr = [];

  if (req.body.search === 'title'){
    url = `https://www.googleapis.com/books/v1/volumes?q=${req.query.search}`;
  }
  else if (req.body.search === 'author'){
    url = `https://www.googleapis.com/books/v1/volumes?q=${req.query.search}`;}

  superagent.get(url)
    .then((key) => {
      key.body.items.map( data =>{
        const newBook = new Books(data);
        newbookArr.push(newBook);
      });
      //   console.log(apiResponse.body.items[0]);
      res.send(newbookArr);
    });
});


//******************************************************* constructor **********************************************************************\\

// constructor
function Books(bookInfo){
  this.title = bookInfo.volumeInfo.title;
  this.authors = bookInfo.volumeInfo.authors[0];
  this.description = bookInfo.volumeInfo.description;
  this.image = bookInfo.volumeInfo.imageLinks.smallThumb;
}


//******************************************************* Error Handeling **********************************************************************\\
// function errorHandler (err,req,res){
//   res.status(500).send(err);
// }

app.get('*',(req,res)=>{
  res.status(404).send('This route does not exist!!');
});


app.listen(PORT, () => console.log('OK!'));

