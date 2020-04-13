'use strict';

require('dotenv').config();

//******************************************************* dependencies ***************************************************************

const express = require('express');
const PORT = process.env.PORT || 3000;
const superagent = require('superagent');
const app   = express();


app.use('/public',express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

//******************************************************* page routes ***************************************************************

app.get('/', (req, res) => {
  res.render('./pages/index');
});
app.get('/search', (req,res)=>{
  res.render('pages/searches/new');
});


//******************************************************* rendering the API ***************************************************************

app.post('/searches', bookHandler); // calling th function here since it didnt waork in an arrow function.


function bookHandler (req, res){
  let searchBook = req.body.search;
  let checkGener = req.body.check;

  const url = `https://www.googleapis.com/books/v1/volumes?q=${checkGener}:${searchBook}`;
  superagent.get(url)
    .then(bookData =>
      bookData.body.items.map((book)=>
        new Books (book)))
    .then((books)=> {
      res.render('pages/searches/show' , {bookData:books});

    });

}

// app.post('/searches', (req, res) =>{

//   let searchBook = req.body.search;
//   let checkGener = req.body.check;
//   const url = `https://www.googleapis.com/books/v1/volumes?q=${checkGener}:${searchBook}`;
//   superagent.get(url).then(bookData => {
//     bookData.body.items.map(book =>{
//       new Books(book)
//         .then(books =>{
//           res.render('pages/searches/show' , {bookData:books});
//         });
//     });
//   });
// });


function Books (value) {
  this.images = value.volumeInfo.imageLinks.smallThumbnail;
  this.title = value.volumeInfo.title;
  this.authors = value.volumeInfo.authors;
  this.description = value.volumeInfo.description;

}


//******************************************************* Error ***************************************************************\\

app.use('*', (request, response) => {
  response.render('pages/error');
});

app.listen(PORT, ()=>{

  console.log(`listining to ${PORT}`);

});























//////////////////////////////////////////////////////// failed attempt ///////////////////////////////////////////////////////////////






// // request enviroment
// require('dotenv').config();


// //******************************************************* dependencies ***************************************************************

// // require the dependencies
// const express = require('express');
// const superagent = require('superagent');
// // const cors = require('cors');
// const PORT = process.env.PORT || 4000;
// const app = express();
// // app.use(cors());


// app.set('view engine', 'ejs'); //this is for the html pages after installing it from the terminal
// // app.use(express.static('./publics')); // the static css folders
// app.use('/public',express.static('public'));

// app.use(express.urlencoded({ extended: true })); // to get the data from the form


// //******************************************************* rendering pages **************************************************************\\

// // rendering the html page
// app.get('/', (req, res)=>{
//   res.render('pages/index');
// });
// app.get('/hello', (req, res)=>{
//   res.render('pages/index');
// });
// app.get('/show', (req, res)=>{
//   res.render('pages/searches/show');
// });
// app.get('/searches/new', (req, res)=>{
// //   console.log('this is getting from', req.query);
//   res.render('pages/searches/new');
// });


// // app.get('/error', (req, res) => {
// //   throw new Error('pages/error');
// // });

// //******************************************************* rendering superagent API *******************************************************\\
// // let newBookArr = [];
// // using post to render the url
// app.post('/searches', (req, res) =>{

//   let searchBook = req.body.search;
//   let bookGener = req.body.check;

//   // if (req.body.searchType === 'title'){
//   //   url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.yourBook}&intitle:${req.body.yourBook}`;
//   // }
//   // else if (req.body.searchType === 'author'){
//   //   url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.yourBook}+inauthor:${req.body.yourBook}`;}

//   const url = `https://www.googleapis.com/books/v1/volumes?q=${bookGener}:${searchBook}`;

//   superagent.get(url)
//     .then((booksKey) => {
//       booksKey.body.items.map(data =>{
//         new Books(data);
//         // newbookArr.push(newBook);
//         res.render('pages/searches/show', {booksKey: data});
//       });
//     });
// });


// //******************************************************* constructor **********************************************************************\\

// // constructor
// function Books(bookInfo){
//   this.title = bookInfo.volumeInfo.title;
//   this.authors = bookInfo.volumeInfo.authors;
//   this.description = bookInfo.volumeInfo.description;
//   this.image = bookInfo.volumeInfo.imageLinks.smallThumb;
// }


// //******************************************************* Error Handeling **********************************************************************\\
// // function errorHandler (err,req,res){
// //   res.status(500).send(err);
// // }

// app.get('*',(req,res)=>{
//   res.status(404).send('This route does not exist!!');
// });


// app.listen(PORT, () => console.log(`It's online time onnnnn ${PORT}!!!`));




