let bookTemplate = document.querySelector('.book');
let form = document.forms[0];
let myLibrary = [];
let lastReview;

// Book object constructor
function Book(title, author, year, genre, pages, score) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.pages = pages;
    this.score = score;
}

// Function for publishing myLibrary into HTML
function publishMyLibrary() {
    document.querySelector(`.book-wrap`).replaceChildren("");
    myLibrary.forEach((entry) => {
        for(i = 0; i < 6; i++) {
            bookTemplate.children[i].innerText = Object.values(entry)[i];
        };
        let bookClone = bookTemplate.cloneNode(true);
        bookClone.classList.remove('hidden');
        document.querySelector('.book-wrap').append(bookClone);
    });
}

// Function for storing all published books into myLibrary
function updateMyLibrary() {
    myLibrary = [];
    let pubList = document.querySelectorAll(`.book-wrap .book`);
    pubList.forEach((entry) => {
        let book = new Book(
            entry.children[0].innerText,
            entry.children[1].innerText,
            entry.children[2].innerText,
            entry.children[3].innerText,
            entry.children[4].innerText,
            entry.children[5].innerText
            );
        myLibrary.push(book);
    });
}

// 'Add' button
document.querySelector('.add-button').addEventListener('click', ()=> {
    document.querySelector('.menu').classList.toggle('hidden');
    form.reset();
});

// 'Sort' button
document.querySelector('.sort-button').addEventListener('click', ()=> {
    updateMyLibrary();
    myLibrary.sort((a,b) => a.title > b.title ? 1 : -1);
    publishMyLibrary();
});

// 'Create Entry' button
document.querySelector('.form-button').addEventListener('click', (event)=> {
    event.preventDefault();
    if(form.elements[0].value != ""){
        let book = new Book(
            form.elements[0].value,
            form.elements[1].value,
            form.elements[2].value,
            form.elements[3].value,
            form.elements[4].value,
            form.elements[5].value
        );
        myLibrary.push(book);
        publishMyLibrary();
        form.reset();
    } else {
        document.querySelector(`.title-dialog`).showModal();
    }
});

// 'Review' Button
document.querySelector(".book-wrap").addEventListener('click', (event)=> {
    if(event.target.classList.contains('review-button')) {
        lastReview = event.target.parentElement;
        document.querySelector(`.review-dialog`).showModal();
        document.querySelector(`#review`).placeholder = 
        `${lastReview.children[5].innerText}`;
    }
});

// 'Review Dialog' Button
document.querySelector(`.dialog-button`).addEventListener(`click`, ()=> {
    let newReview = document.querySelector(`#review`);
    lastReview.children[5].innerText = newReview.value;
    newReview.value = ``;
    updateMyLibrary();
    publishMyLibrary();

});

// 'Delete' button
document.querySelector(".book-wrap").addEventListener('click', (event)=> {
    if(event.target.classList.contains('delete-button')) {
        event.target.parentElement.remove();
    }
    updateMyLibrary();
});

