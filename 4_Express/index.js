const express = require('express');
const { v4: uuid } = require('uuid');

class Book {
    constructor( title, description, authors, favorite, fileCover, fileName, id = uuid())
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
  }

  class User {
    constructor( firstName, lastName, id = uuid()){
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }

  const library = {
    books: [],
    users: [],
  }

  const app = express();
  app.use(express.json());

    // поиск всех книг из массива books
  app.get('/api/books', (req, res) => {
    const {books} = library;
    res.json(books);
  });

    // поиск книги по id из запроса
  app.get('/api/books/:id', (req, res) => {
    const {books} = library;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1){
      res.json(books[idx])
    } else {
      res.status (404);
      res.json('404 | Страница не найдена');
    }
  });

    // создание нового экземпляра книги
  app.post('/api/books', (req, res) => {
    const {books} = library;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
  });

    // обновление книги
  app.put('/api/books/:id', (req, res) => {
    const {books} = library;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id ===id);

    if (idx !==-1){
      books[idx] = {
        ...books[idx],
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
      }

      res.json(books[idx]);

    } else {
      res.status(404);
      res.json('404 | страница не найдена');
    }
  });

    // удаление книги
  app.delete('/api/books/:id', (req, res) => {
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

     // создание нового пользователя
     app.post('/api/users', (req, res) => {
      const {users} = library;
      const {firstName, lastName} = req.body;
  
      const newUser = new User(firstName, lastName);
      users.push(newUser);
  
      res.status(201);
      res.json(newUser);
    });

     // поиск всех пользователей из массива users
  app.get('/api/users', (req, res) => {
    const {users} = library;
    res.json(users);
  });

    // поиск пользователя по id из запроса
    app.get('/api/users/:id', (req, res) => {
      const {users} = library;
      const {id} = req.params;
      const idx = users.findIndex(el => el.id === id);
  
      if (idx !== -1){
        res.json(users[idx])
      } else {
        res.status (404);
        res.json('404 | Пользователь не найден');
      }
    });

     // обновление пользователя
  app.put('/api/users/:id', (req, res) => {
    const {users} = library;
    const {firstName, lastName} = req.body;
    const {id} = req.params;
    const idx = users.findIndex(el => el.id ===id);

    if (idx !==-1){
      users[idx] = {
        ...users[idx],
        firstName,
        lastName
      }

      res.json(users[idx]);

    } else {
      res.status(404);
      res.json('404 | Пользователь не найден');
    }
  });
    
      // удаление пользователя
  app.delete('/api/users/:id', (req, res) => {
    const {users} = library;
    const {id} = req.params;
    const idx = users.findIndex(el => el.id === id);

    if (idx !== -1){
      users.splice(idx, 1);
      res.json(true);
    } else {
      res.status(404);
      res.json('404 | Пользователь не найден');
    }
  });
  
  const PORT = process.env.PORT || 3000
  app.listen(PORT);