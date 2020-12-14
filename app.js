//Book Class
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class
class UI{
//Display Books
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }
//Add Book to List
    static addBookToList(book){
        const list = document.getElementById('book-list'); 

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        `;

        list.appendChild(row);
    }
//Delete a Book
    static deleteBook(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
            UI.showAlert('Book Removed Successfully!', 'danger');
        }
    }

//show Alerts

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

//Clear input text
    static clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

}

//Store Class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

}


//Event: Display all Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add A book
document.getElementById('book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert("Please fill out all the fields", 'warning');
    }
    else{
        const book = new Book(title, author, isbn);
    
        UI.addBookToList(book);

        Store.addBook(book);

        UI.showAlert('Book Added Successfully!', 'success');

        UI.clearFields();
        
    }
});

//Event: Remove a Book
document.getElementById('book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});