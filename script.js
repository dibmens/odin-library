let bookTemplate = document.querySelector('.book');
let form = document.forms[0];
let myLibrary = [];

// Book object constructor

function Book(title, author, year, genre, pages, score) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.pages = `${pages} pages`;
    this.score = score;
}

// Function for adding a new book object in myLibrary

function addBookToLibrary() {
    let bookVal = [];

    for(i = 0; i < 6; i++){
        bookVal.push(form.elements[i].value);
    };

    let book = new Book(bookVal[0],bookVal[1],bookVal[2],bookVal[3],bookVal[4],bookVal[5]);
   
    myLibrary.push(book);
}


document.querySelector('.add-button').addEventListener('click', ()=> {
    document.querySelector('.menu').classList.toggle('hidden');
    form.reset();
});


//  Function for sorting myLibrary


// Create Entry button functionality

document.querySelector('.form-button').addEventListener('click', (event)=> {

    event.preventDefault();

    addBookToLibrary();

    if(form.elements[0].value != ""){

        for(i = 0; i < 6; i++){
            bookTemplate.children[i].innerText = Object.values(myLibrary[myLibrary.length-1])[i];
        };

        let bookClone = bookTemplate.cloneNode(true);
        bookClone.classList.remove('hidden');

        document.querySelector('.book-wrap').append(bookClone);

        form.reset();
    } else {
        alert('Please add a title to your new entry!');
    }
});

// Delete Entry button functionality

document.querySelector(".book-wrap").addEventListener('click', (click)=> {
    if(click.target.classList.contains('delete-button')) {
        click.target.parentElement.remove();
    }
});

