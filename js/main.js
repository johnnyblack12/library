let newButton = document.getElementById('newButton');
const library = document.getElementById('library');

function add() {

    library.removeChild(newButton);
    let newForm = document.createElement('form');
    newForm.classList.add('new-form');
    
    genInput(newForm, 'title', 'text');
    genInput(newForm, 'author', 'text');
    genInput(newForm, 'pages', 'number');

    let collapse = document.createElement('div');
    collapse.classList.add('button');
    collapse.textContent = '\u25C4';
    newForm.appendChild(collapse);
    
    let submit = document.createElement('div');
    submit.classList.add('button');
    submit.textContent = '+';
    newForm.appendChild(submit);

    library.appendChild(newForm);

    collapse.addEventListener('click', collapseForm);

    submit.addEventListener('click', () => {
        let title = document.getElementById('title');
        let author = document.getElementById('author');
        let pages = document.getElementById('pages');
        if (title.value && author.value && pages.value) {
            let book = new Book(title.value, author.value, pages.value);
            book.generate();
            collapseForm();
        } else if (newForm.lastChild.classList != 'entry-warning') {
            let notif = document.createElement('div');
            notif.classList.add('entry-warning');
            notif.textContent += 'All fields are required.';
            newForm.appendChild(notif);
            let inputs = document.querySelectorAll('input');
            inputs.forEach((input) => {
                input.addEventListener('input', () => {
                    if (newForm.lastChild.classList == 'entry-warning') {
                        newForm.removeChild(newForm.lastChild);
                    }
                });
            });
        }
    });

    function collapseForm() {
        library.removeChild(newForm);
        newButton = document.createElement('div');
        newButton.classList.add('new-button');
        newButton.textContent += '+';
        library.appendChild(newButton);
        newButton.addEventListener('click', add);
    }
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

