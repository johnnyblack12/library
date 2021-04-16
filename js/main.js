const library = document.querySelector('.library');
let newButton = new NewButton();
newButton.generate();

function Button(initClass, initText) {
    this.container = document.createElement('div');
    this.container.classList.add(initClass);
    this.container.textContent += initText;
    return (this.container);
}

function Warning(initClass, initText) {
    this.container = document.createElement('div');
    this.container.classList.add(initClass);
    this.container.textContent += initText;
    return (this.container);
}

function NewButton() {
    this.container = document.createElement('div');
    this.container.classList.add('new-button');
    this.container.textContent = '+';

    this.generate = function() {
        library.appendChild(this.container);
        this.container.addEventListener('click', () => {
            library.removeChild(this.container);
            let newForm = new Form('new-form');
            
            newForm.genInput('title', 'text');
            newForm.genInput('author', 'text');
            newForm.genInput('pages', 'number');
    
            newForm.genCollapseButton();
            newForm.genSubmitButton();
        
            library.appendChild(newForm.container);
        });
    }
}

function Form(initClass) {
    this.container = document.createElement('form');
    this.container.classList.add(initClass);

    this.genInput = function(id, type) {
        let field = document.createElement('input');
        let label = document.createElement('label');
        field.setAttribute('type', type);
        field.setAttribute('id', id);
        field.classList.add('field');
        label.setAttribute('for', id);
        label.textContent += id + ': ';
        this.container.appendChild(label);
        this.container.appendChild(field);
    }

    this.genCollapseButton = function() {
        let collapse = new Button('control-button', '\u25C4');
        this.container.appendChild(collapse);

        collapse.addEventListener('click', () => {
            library.removeChild(this.container);
            library.appendChild(newButton.container);
        });
    }

    this.genSubmitButton = function() {
        let submit = new Button('control-button', '+');
        this.container.appendChild(submit);

        submit.addEventListener('click', () => {
            let title = document.getElementById('title');
            let author = document.getElementById('author');
            let pages = document.getElementById('pages');

            if (title.value && author.value && pages.value) {
                let book = new Book(title.value, author.value, pages.value);
                book.generate();
                library.removeChild(this.container);
                library.appendChild(newButton.container);
            } else if (this.container.lastChild.classList != 'entry-warning') {
                let warning = new Warning('entry-warning', 'All fields are required.');
                this.container.appendChild(warning);
                let inputs = document.querySelectorAll('input');
                inputs.forEach((input) => {
                    input.addEventListener('input', () => {
                        if (this.container.lastChild.classList == 'entry-warning') {
                            this.container.removeChild(this.container.lastChild);
                        }
                    });
                });
            }
        });
    }
}

function Book(title, author, pages) {
    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;

    this.container = document.createElement('div');
    this.container.classList.add('book');

    this.titleLine = document.createElement('p');
    this.titleLine.classList.add('book-title');
    this.titleLine.textContent += this.title;

    this.authorLine = document.createElement('p');
    this.authorLine.textContent += this.author;

    this.pagesLine = document.createElement('p');
    this.pagesLine.textContent += 'Pages: ' + this.pages;

    this.generate = function() {
        this.container.appendChild(this.titleLine);
        this.container.appendChild(this.authorLine);
        this.container.appendChild(this.pagesLine);
        library.insertBefore(this.container, document.querySelector('.new-form'));

        let readButton = new Button('unread-button', 'Unread');
        this.container.appendChild(readButton);
        readButton.addEventListener('click', () => {
            this.read = !this.read;
            if (this.read) {
                readButton.classList.replace('unread-button', 'read-button');
                readButton.textContent = 'Read';
            } else {
                readButton.classList.replace('read-button', 'unread-button');
                readButton.textContent = 'Unread';
            }
        });

        let delButton = new Button('delete-button', 'Delete');
        this.container.appendChild(delButton);
        delButton.addEventListener('click', () => {
            if (this.container.lastChild.classList != 'delete-warning') {
                delButton.classList.replace('delete-button', 'delete-button-clicked')
                let warning = new Warning('delete-warning', 'Are you sure?');
                let y = new Button('yn-button', 'Yes');
                let n = new Button('yn-button', 'No');
                this.container.appendChild(warning);
                warning.appendChild(y);
                warning.appendChild(n);
                y.addEventListener('click', () => {
                    library.removeChild(this.container);
                });
                n.addEventListener('click', () => {
                    this.container.removeChild(warning);
                    delButton.classList.replace('delete-button-clicked', 'delete-button');
                });
            }
        });
    }
}
