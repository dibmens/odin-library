let bookTemplate = document.querySelector('.book');
let form = document.forms[0];
let myLibrary = [];

// Book object constructor

function Book(title, author, year, genre, pages, score) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.pages = pages;
    this.score = score;
}

// Function for adding new book object in myLibrary

function addBookToLibrary() {
    
    let bookVal = [];

    for(i = 0; i < 6; i++){
        bookVal.push(form.elements[i].value);
    };

    let book = new Book(bookVal[0],bookVal[1],bookVal[2],bookVal[3],bookVal[4],bookVal[5]);
   
    myLibrary.push(book);
}


// Function for publishing myLibrary

function publishMyLibrary() {

    document.querySelector(`.book-wrap`).replaceChildren("");

    myLibrary.forEach((entry) => {

        for(i = 0; i < 6; i++){
            bookTemplate.children[i].innerText = Object.values(entry)[i];
        };

        let bookClone = bookTemplate.cloneNode(true);
        bookClone.classList.remove('hidden');

        document.querySelector('.book-wrap').append(bookClone);

    });
}

// Function for storing currently published books into myLibrary

function updateMyLibrary() {
    let pubList = document.querySelectorAll(`.book-wrap .book`);
    myLibrary = [];

    pubList.forEach((entry) => {
        let title = entry.children[0].innerText;
        let author = entry.children[1].innerText;
        let year = entry.children[2].innerText;
        let genre = entry.children[3].innerText;
        let pages = entry.children[4].innerText;
        let score = entry.children[5].innerText;

        let book = new Book(title,author,year,genre,pages,score);
        myLibrary.push(book);
    });
}


// Add button

document.querySelector('.add-button').addEventListener('click', ()=> {
    document.querySelector('.menu').classList.toggle('hidden');
    form.reset();
});


// Sort button

// Delete button

document.querySelector(".book-wrap").addEventListener('click', (click)=> {
    if(click.target.classList.contains('delete-button')) {
        click.target.parentElement.remove();
    }
    updateMyLibrary();

});


// Create Entry button

document.querySelector('.form-button').addEventListener('click', (event)=> {

    event.preventDefault();

    if(form.elements[0].value != ""){

        addBookToLibrary();
        publishMyLibrary();
        form.reset();

    } else {
        alert('Please add a title to your new entry!');
    }
});