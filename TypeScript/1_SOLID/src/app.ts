interface Book {
    id: string,
    title: string,
    description: string,
    authors: string,
    favorite: string,
    fileCover: string,
    fileName: string
}

const book: Book = {
    id: '1',
    title: 'Теремок',
    description: 'Сказка',
    authors: 'Русский нород',
    favorite: '',
    fileCover: '',
    fileName: ''
}

abstract class BooksRepository  {

    // создание книги
    createBook(book): Book{
       console.log('Not Implemented');
       return 0;
    } 

    // получение книги по id
    getBook(id): string{
      console.log('Not Implemented');
       return 0;
    }


    // получение всех книг
    getBooks(): Book{
      console.log('Not Implemented');
       return 0;
    }

    // обновление книги
    updateBook(id): string{
      console.log('Not Implemented');
       return 0;
    }

    //удаление книги
    deleteBook(id): string{
      console.log('Not Implemented');
       return 0;  
    }

}