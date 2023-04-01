const express = require('express');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const fileMulter = require('../middleware/file');

class Book {
    constructor( title, description, authors, favorite, fileCover, fileName, fileBook, id = uuid())
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
    }
  }

  const library = {
    books: [
      new Book(
        "Колобок",
        "Русская народная сказка"
        ),
    ],
  }

    // поиск всех книг из массива books
  router.get('/', (req, res) => {
    const {books} = library;
    res.status(200).json(books);
  });

    // поиск книги по id из запроса
  router.get('/:id', (req, res) => {
    const {books} = library;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1){
      res.json(books[idx]);
    } else {
      res.status (404);
      res.json('404 | Страница не найдена');
    }
  });

  // добавление нового экземпляра книги
  router.post('/', fileMulter.single('fileBook'), (req, res) => {
    const {books} = library;
    const { body, file } = req;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    
    let fileBook = null;
    if(req.file){
        const {path} = req.file;
        fileBook = path;
    }
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
  });

    // обновление книги
  router.put('/:id', (req, res) => {
    const {books} = library;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id ===id);

    let fileBook = null;

    if(req.file){
        const {path} = req.file;
        fileBook = path;
    }

    if (idx !==-1){
      books[idx] = {
        ...books[idx],
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
      }

      res.json(books[idx]);

    } else {
      res.status(404);
      res.json('404 | страница не найдена');
    }
  });

    // удаление книги
  router.delete('/books/:id', (req, res) => {
    const {books} = library;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1){
      books.splice(idx, 1);
      res.json(true);
    } else {
      res.status(404);
      res.json('404 | страница не найдена');
    }
  });

    // скачать книгу по id из запроса
    router.get('/books/:id/download', (req, res) => {
      const {books} = library;
      const {id} = req.params;
      const idx = books.findIndex(el => el.id === id);
  
      if(idx !== -1) {
          const filePath = path.join(__dirname, '', '..');
          const file = filePath + '\\public\\books\\demo.png';
          res.download(file);
      } 
  });

module.exports = router;