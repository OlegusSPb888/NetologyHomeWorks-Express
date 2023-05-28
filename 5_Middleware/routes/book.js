const express = require('express')
const { v4: uuid } = require('uuid')
const router = express.Router();
const fileMulter = require('../middleware/file')
const fs = require('fs')
const path = require('path')

class Book {
    constructor(title, description, authors, favorite, fileCover, fileName, fileBook, id = uuid()) {
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
            'Колобок',
            'Сказка',
            'Русский народ',
        ),
        new Book(
            'Руслан и Людмила',
            'Поэма',
            'Александр Сергеевич Пушкин',
        ),
    ]
};


    //Получить список всех книг

router.get('/books', (req, res) => {
    const {books} = library
    res.json(books)
})


    //Получить книгу по id
 
router.get('/books/:id', (req, res) => {
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.json(books[idx])
    } 
})


    //Скачать книгу по id

router.get('/books/:id/download', (req, res) => {
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if(idx !== -1) {
        const filePath = path.join(__dirname, '..', books[idx].fileBook)
        res.download(filePath)
    } 
})


    //Добавить новую книгу

router.post(
    '/books/', fileMulter.single('fileBook'), (req, res) => {
    const {books} = library
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    let fileBook = null
    if(req.file){
        const {path} = req.file
        fileBook = path;
    }

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
    books.push(newBook)

    res.status(201)
    res.json(newBook)
})


    //Изменить книгу

router.put('/books/:id', fileMulter.single('fileBook'), (req, res) => {
    const {books} = library
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    let fileBook = null

    if(req.file){
        const {path} = req.file
        fileBook = path;
    }

    if (idx !== -1) {
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

        res.json(books[idx])
    } 
})


    //Удалить книгу

router.delete('/books/:id', (req, res) => {
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)
     
    if(idx !== -1) {
        books.splice(idx, 1)
        res.json('ok')
    } 
})

module.exports = router