let myLibrary = [];

let body = document.querySelector('body'),
    table = document.querySelector('table'),
    tableBody = document.createElement('tbody');


//          Sample Books            \\
let TCITH = new Book('the cat in the hat', 'dr.suess', '23', 'true'),
    ABNW = new Book('a brave new world', 'aldous huxley', '343', 'true'),
    ACO = new Book('a clockwork orange', 'anthony burgess', '176', 'false');
myLibrary.push(TCITH, ABNW, ACO);


//          Book Constructor            \\
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        let haveRead = (read == 'true')? 'read' : 'not read yet';
        return title + ' by ' + author + ', ' + pages + ' pages long, ' + haveRead
    }
}

Book.prototype.info = 

//           User Add Book           \\
function addBookToLibrary() {
    let title = prompt('what is the name of your book?');
    let author = prompt('who wrote the book?');
    let pages = prompt('how many pages long?');
    let read = prompt('have you read it? enter true/false')

    myLibrary.push(new Book(title, author, pages, read));
}

//              NEW BOOK Button             \\
let newBookButton = document.createElement('button');
newBookButton.textContent = 'Add New Book';
body.appendChild(newBookButton);

newBookButton.addEventListener('click', function () {
    addBookToLibrary();
    updateLibrary(myLibrary[myLibrary.length-1]);
})


//          Create Table            \\
function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement('th');
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);   
    }
}

function generateTable(table, element) {
    let row = table.insertRow();
    for (key in element) {
        let cell = row.insertCell();
        let cellText;
        if (typeof element[key] == 'function') {
            cellText = document.createTextNode(element[key]());
        } else {
            cellText = document.createTextNode(element[key]);
        }
        cell.appendChild(cellText);
    }
}

function updateLibrary(book) {
    generateTable(table, book);
}

//          Initial         \\
for (book of myLibrary) {
    updateLibrary(book);
}

data = Object.keys(myLibrary[0]);
generateTableHead(table, data);

