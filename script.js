let myLibrary = [];

let body = document.querySelector('body'),
    table = document.querySelector('table');

let capitilize = (string) => string.slice(0, 1).toUpperCase() + string.slice(1);

let id = 0;
const generateID = () => id++;



//          Sample Books            \\
let TCITH = new Book('the cat in the hat', 'dr.suess', '23', true),
    ABNW = new Book('a brave new world', 'aldous huxley', '343', true),
    ACO = new Book('a clockwork orange', 'anthony burgess', '176', false);
myLibrary.push(TCITH, ABNW, ACO);


//          Book Constructor            \\
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = generateID();
}

Book.prototype.info = function() {
    let haveRead = (this.read == 'true')? 'read' : 'not read yet';
    return this.title + ' by ' + this.author + ', ' + this.pages + ' pages long, ' + haveRead
}


//           User Add Book           \\
function addBookToLibrary() {
    let title = prompt('what is the name of your book?');
    let author = prompt('who wrote the book?');
    let pages = prompt('how many pages long?');
    let read = prompt('have you read it? enter true/false') == 'true';

    myLibrary.push(new Book(title, author, pages, read));
}

//              NEW BOOK Button             \\
let newBookButton = document.createElement('button');
newBookButton.textContent = 'Add New Book';
newBookButton.onclick = function() {
    addBookToLibrary();
    updateLibrary(myLibrary[myLibrary.length-1]);
}
body.appendChild(newBookButton);


//          Create Table            \\


function generateTableHead() {
    let headers = Object.keys(myLibrary[0]);
    headers.push('Remove Entry', 'Toggle Status');
    headers.splice(headers.indexOf('id'),1);

    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let header of headers) {
        let th = document.createElement('th');
        let text = document.createTextNode(capitilize(header));
        th.appendChild(text);
        row.appendChild(th);   
    }

}

function generateTable() {
    for (book of myLibrary){
        let row = table.insertRow();
        for (let key in book) {
            if (book.hasOwnProperty(key) && key != 'id') {
                let cellText = document.createTextNode(book[key]);
                row.insertCell().appendChild(cellText);
            }
        }
        let removeButton = createButton(book, 'remove', 'Remove', removeBook);
        row.insertCell().appendChild(removeButton);

        let readButton = createButton(book, 'read', 'Read?', readBook);
        row.insertCell().appendChild(readButton);
    } 
}

function updateLibrary() {
    body.removeChild(table);
    newTable = document.createElement('table');
    body.appendChild(newTable);

    table = document.querySelector('table');

    generateTable();
    generateTableHead();
}

//          Initial         \\

for (book of myLibrary) {
    updateLibrary(book);
}


//           Buttons           \\

function getIndex(book){
    for (i=0; i<myLibrary.length; i++) {
        if (book.id == myLibrary[i].id){
            return i
        } 
    }
}

function createButton(book, className, text, func) {
    let button = document.createElement('button');
    let index = getIndex(book);
    button.value = index;
    button.classList = className;
    button.textContent = text;
    button.onclick = function() {func(index); };
    return button
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    updateLibrary();
}

function readBook(index) {
    myLibrary[index].read = (myLibrary[index].read==true)? false : true;
    updateLibrary();
}








