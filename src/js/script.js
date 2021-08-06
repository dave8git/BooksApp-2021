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
    if (e.target.tagName == 'INPUT' && e.target.type == 'checkbox' && e.target.name == 'filter') {
      console.log(e.target.value);
      if(e.target.checked) {
        thisBooks.filters.push(e.target.value);
      } else {
        for(let filter of thisBooks.filters) {
          thisBooks.filters.splice(thisBooks.filters.indexOf(filter), 1);
        }
      }
    }
    console.log('thisBooks.favoriteBooks', thisBooks.filters);
  }

  shouldBeHidden() {
    const thisBooks = this;
    let shouldBeHidden = false;
      
    for (let book of dataSource.books) {
      const id = book.id;
      for (let filter of thisBooks.filters) {
        console.log('filter',filter);
        console.log('book', book.details.adults);
        if(!book.details[filter]) {
          console.log('true');
          shouldBeHidden = false;
        } else {
          shouldBeHidden = true;
          console.log('false');
          
        }
      }
      if(shouldBeHidden) {
        console.log('fsldkaflkjsalkdfj', book);
        console.log(thisBooks.dom.books);
        let pickedBook = document.querySelector('.book__image[data-id=' + `"${id}"` + ']');
        pickedBook.classList.add('hidden');
        console.log('id', id);
      } else {
        let pickedBook = document.querySelector('.book__image[data-id=' + `"${id}"` + ']');
        pickedBook.classList.remove('hidden');
        console.log('id', id);
      }
    }
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
      //e.preventDefault(); 
      thisBooks.booksFilter(e); 
      thisBooks.shouldBeHidden();
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