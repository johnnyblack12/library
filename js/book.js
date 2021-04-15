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
        let newForm = document.querySelector('.new-form');
        library.insertBefore(bookTile, newForm);

        let readButton = document.createElement('div');
        readButton.classList.add('unread');
        readButton.textContent += 'Unread';
        bookTile.appendChild(readButton);
        readButton.addEventListener('click', () => {
            this.read = !this.read;
            if (this.read) {
                readButton.classList.replace('unread', 'read');
                readButton.textContent = 'Read';
            } else {
                readButton.classList.replace('read', 'unread');
                readButton.textContent = 'Unread';
            }
        });

        let delButton = document.createElement('div');
        delButton.classList.add('delete-button');
        delButton.textContent += 'Delete';
        bookTile.appendChild(delButton);
        delButton.addEventListener('click', () => {
            if (bookTile.lastChild.classList != 'delete-warning') {
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
                bookTile.appendChild(notif);
                notif.appendChild(y);
                notif.appendChild(n);
                y.addEventListener('click', () => {
                    library.removeChild(bookTile);
                });
                n.addEventListener('click', () => {
                    bookTile.removeChild(notif);
                    delButton.classList.replace('delete-button-clicked', 'delete-button');
                });
            }
        });
    }
}