const select = {
  templateOf: {
    book: '#template-book',
  },
  containerOf: {
    booklist: '.books-list',
    bookImage: '.book-image',
  },
};

const templates = {
  bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

class books {
  constructor() {
    const thisBooks = this;
    
    thisBooks.render();
    thisBooks.getElements();
    thisBooks.initActions(); 
    
  }
  getElements() {
    const thisBooks = this; 
    thisBooks.dom = {};
    thisBooks.favoriteBooks = [];
    thisBooks.books = dataSource.books; 
    thisBooks.dom.books = thisBooks.booklist.querySelectorAll('.book__image');
    console.log('thisBooks.dom.books', thisBooks.dom.books);

    //thisBooks.element.querySelector(.book)
    
  }
  render() {
    const thisBooks = this;
    for (let book of dataSource.books) {
      const generatedHTML = templates.bookTemplate(book);
      thisBooks.element = utils.createDOMFromHTML(generatedHTML);
      thisBooks.booklist = document.querySelector(select.containerOf.booklist);
      thisBooks.booklist.appendChild(thisBooks.element);
    }
    
    console.log(thisBooks.booklist);
  }
  initActions() {
    const thisBooks = this;
    for (let book of thisBooks.dom.books) {
      book.addEventListener('dblclick', function(event) {
        event.preventDefault();
        book.classList.toggle('favorite');
        let bookAttr = book.getAttribute('data-id');
        
        if(!thisBooks.favoriteBooks.includes(bookAttr)) {
          thisBooks.favoriteBooks.push(bookAttr);
        } else {
          for(let favorite of thisBooks.favoriteBooks) {
            if(favorite == bookAttr) {
              thisBooks.favoriteBooks.splice(thisBooks.favoriteBooks.indexOf(favorite), 1);
            }
          }
        }
        console.log(thisBooks.favoriteBooks);
        console.log('hurrra!');
      }); 
    }
  }
}

const newBooks = new books();

console.log(newBooks);