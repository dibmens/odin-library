let bookTemplate = document.querySelector('.book');
let form = document.forms[0];
let myLibrary = [];

function Book(title, author, year, genre, pages, score) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.pages = pages;
    this.score = score;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.year}, a ${this.genre} book in ${this.pages} pages, with a rating of ${this.score}`;
    };
}

function addBookToLibrary() {
    let bookVal = [];

    for(i = 0; i < 6; i++){
        bookVal.push(form.elements[i].value);
    };

    let book = new Book(bookVal[0],bookVal[1],bookVal[2],bookVal[3],bookVal[4],bookVal[5]) 
   
    myLibrary.push(book);
}


document.querySelector('.add-button').addEventListener('click', ()=> {
    document.querySelector('.menu').classList.toggle('hidden');
    form.reset();
});

document.querySelectorAll('.delete-button').forEach((button) => 
    button.addEventListener('click', ()=> {
        button.parentNode.remove();
}));

document.querySelector('.form-button').addEventListener('click', (event)=> {

    event.preventDefault();

    addBookToLibrary();

    for(i = 0; i < 6; i++){
        bookTemplate.children[i].innerText = Object.values(myLibrary[myLibrary.length-1])[i];
    };

    let bookClone = bookTemplate.cloneNode(true);
    bookClone.classList.remove('hidden');

    document.querySelector('.book-wrap').append(bookClone);

    form.reset();
});