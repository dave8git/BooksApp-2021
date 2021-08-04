const select = {
  templateOf: {
    book: '#template-book',
  },
  containerOf: {
    booklist: '.books-list',
  },
};

const templates = {
  book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

class books {
  constructor() {
    const thisBooks = this;
    
    thisBooks.render();
    thisBooks.getElements();
    
  }
  getElements() {

  }
  render() {
    const thisBooks = this;
    for (let book of dataSource.books) {
      console.log('book', book);
      const generatedHTML = templates.book(book.id);
      thisBooks.element = utils.createDOMFromHTML(generatedHTML);
      const booklist = document.querySelector(select.containerOf.booklist);
      booklist.appendChild(thisBooks.element);
    }
    
    console.log(dataSource.books);
  }
}

const newBooks = new books();

console.log(newBooks);