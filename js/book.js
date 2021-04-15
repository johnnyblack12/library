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
                let notif = document.createElement('div');
                let y = document.createElement('div');
                let n = document.createElement('div')
                y.classList.add('yn-button');
                n.classList.add('yn-button');
                y.textContent += 'Yes';
                n.textContent += 'No';
                notif.classList.add('delete-warning');
                notif.textContent += 'Are you sure?';
                this.container.appendChild(notif);
                notif.appendChild(y);
                notif.appendChild(n);
                y.addEventListener('click', () => {
                    library.removeChild(this.container);
                });
                n.addEventListener('click', () => {
                    this.container.removeChild(notif);
                    delButton.classList.replace('delete-button-clicked', 'delete-button');
                });
            }
        });
    }
}