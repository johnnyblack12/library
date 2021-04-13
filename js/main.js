let newButton = document.getElementById('newButton');
const library = document.getElementById('library');

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.generate = function() {
        let bookTile = document.createElement('div');
        bookTile.classList.add('book');
        let titleLine = document.createElement('p');
        let authorLine = document.createElement('p');
        let pagesLine = document.createElement('p');
        titleLine.classList.add('book-title');
        titleLine.textContent += this.title;
        authorLine.textContent += this.author;
        pagesLine.textContent += 'Pages: ' + this.pages;
        bookTile.appendChild(titleLine);
        bookTile.appendChild(authorLine);
        bookTile.appendChild(pagesLine);
        let newForm = document.querySelector('.newForm');
        library.insertBefore(bookTile, newForm);
    }
}

function add() {
    newButton.removeEventListener('click', add);
    library.removeChild(newButton);
    let newForm = document.createElement('form');
    newForm.classList.add('new-form');
    
    genInput(newForm, 'title', 'text');
    genInput(newForm, 'author', 'text');
    genInput(newForm, 'pages', 'number');
    
    let submit = document.createElement('div');
    submit.classList.add('submit');
    submit.textContent = '+';
    newForm.appendChild(submit);

    library.appendChild(newForm);

    submit.addEventListener('click', () => {
        let title = document.getElementById('title');
        let author = document.getElementById('author');
        let pages = document.getElementById('pages');
        if (title.value && author.value && pages.value) {
            let book = new Book(title.value, author.value, pages.value);
            book.generate();
            while (newForm.hasChildNodes()) {
                newForm.removeChild(newForm.firstChild);
            }
            library.removeChild(newForm);
            newButton = document.createElement('div');
            newButton.classList.add('new-button');
            newButton.textContent += '+';
            library.appendChild(newButton);
            newButton.addEventListener('click', add);
        } else {
            let notif = document.createElement('div');
            notif.classList.add('warning');
            notif.textContent += 'All fields are required';
            newForm.appendChild(notif);
            let inputs = document.querySelectorAll('input');
            inputs.forEach((input) => {
                input.addEventListener('input', () => {
                    if (notif) {
                        newForm.removeChild(notif);
                    }
                });
            });
        }
    });
}

function genInput(form, id, type) {
    let field = document.createElement('input');
    let label = document.createElement('label');
    field.setAttribute('type', type);
    field.setAttribute('id', id);
    field.classList.add('field');
    label.setAttribute('for', id);
    label.textContent += id + ': ';
    form.appendChild(label);
    form.appendChild(field);
}

newButton.addEventListener('click', add);

