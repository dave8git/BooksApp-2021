const select = {
  templateOf: {
    book: '#template-book',
  },
  containerOf: {
    booklist: '.books-list',
    bookImage: '.book-image',
  },
  form: {
    checkbox: '.filters form',
  }
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
    //thisBooks.booksFilter(); 
    
  }
  getElements() {
    const thisBooks = this; 
    thisBooks.dom = {};
    thisBooks.favoriteBooks = [];
    thisBooks.filters = [];
    thisBooks.books = dataSource.books; 
    thisBooks.dom.books = thisBooks.booklist.querySelectorAll('.book__image');
    thisBooks.dom.filters = document.querySelector(select.form.checkbox);
    console.log('thisBooks.dom.books', thisBooks.dom.books);

    //thisBooks.element.querySelector(.book)
    
  }
  booksFilter(e) {
    const thisBooks = this;
    console.log('thisBooks.dom.filters', thisBooks.dom.filters);
    console.log(e);
  }
  render() {
    const thisBooks = this;
    for (let book of dataSource.books) {
      const generatedHTML = templates.bookTemplate(book);
      thisBooks.element = utils.createDOMFromHTML(generatedHTML);
      thisBooks.booklist = document.querySelector(select.containerOf.booklist);
      thisBooks.booklist.appendChild(thisBooks.element);
    }
    
    //console.log(thisBooks.booklist);
  }

  initActions() {
    const thisBooks = this;
    document.querySelector(select.containerOf.booklist).addEventListener('dblclick', function(e) {
      //console.log(e.target.parentNode.parentNode.classList.contains('book__image'));
      //console.log(e.target.parentNode.parentNode.parentNode);
      if (e.target.parentNode.parentNode.classList.contains('book__image')) {
        thisBooks.bookSelector(e.target.parentNode.parentNode);
      }
    });
    thisBooks.dom.filters.addEventListener('click', function(e) {
      e.preventDefault(); 
      thisBooks.booksFilter(e); 
    });
  }
  bookSelector(book) {
    const thisBooks = this;
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
    //console.log(thisBooks.favoriteBooks);
    console.log('hurrra!');
  } 
}



const newBooks = new books();

console.log(newBooks);