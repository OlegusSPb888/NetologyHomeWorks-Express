const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

class Book {
    constructor(title = "", desc = "", id = uuid()) {
        this.title = title;
        this.desc = desc;
        this.id = id;
    }
}
const stor = {
    book: [],
};

[1, 2, 3, 4].map(el => {
    const newBook = new Book(`Книга ${el}`, `Описание книги ${el}`);
    stor.book.push(newBook);
});


// Получение полного списка книг
router.get('/', (req, res) => {
    const {book} = stor;
    res.render("book/index", {
        title: "Библиотека",
        books: book,
    });
});


// Создание нового экземпляра книги
router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Книга | Создать",
        book: {},
    });
});

router.post('/create', (req, res) => {
    const {book} = stor;
    const {title, desc} = req.body;

    const newBook = new Book(title, desc);
    book.push(newBook);

    res.redirect('/book')
});


// Поиск книги по id
router.get('/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 
        
    res.render("book/view", {
        title: "Книга | Просмотр",
        book: book[idx],
    });
    
});


// Редактирование книги
router.get('/update/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    res.render("book/update", {
        title: "Книга | Редактировать",
        book: book[idx],
    });
});

router.post('/update/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const {title, desc} = req.body;
    const idx = book.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    book[idx] = {
        ...book[idx],
        title,
        desc,
    };
    res.redirect(`/book/${id}`);
});


// Удаление книги
router.post('/delete/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    book.splice(idx, 1);
    res.redirect(`/book`);
});

module.exports = router;