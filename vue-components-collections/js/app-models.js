// The 'Model' is responsible for managing the data of the application.
// You can define your models in the 'data' section of each Vue component
// or define them separately if they might be used by multiple components.

// Models are usually prototypes (similar to classes if you are familiar with those)
function LibraryCollection(){
    this.__proto__ = []; // as of ES6 (2015)

    this.addItem = function(item){
        this.push(LibraryItem(item));

        // allows us to chain methods
        return this;
    }

    this.checkedOutItems = function(){
        return this.filter(function(item){
            return !item.isAvailable();
        })
    }
}
// current and pre-ES6
LibraryCollection.prototype = [];
LibraryCollection.prototype.constructor = LibraryCollection;
function CartCollection(){
    this.__proto__ = []; // as of ES6 (2015)

    this.addItem = function(item){
        this.push(new CartItem(item,function(item){this.removeItem(item)}.bind(this)));

        // allows us to chain methods
        return this;
    }
    this.removeItem=function(item){
        this.splice(this.indexOf(item),1);
    }

}
CartCollection.prototype = [];
CartCollection.prototype.constructor = CartCollection;
// let divs = $('div');
// divs.hide().show().html('asdf');
function LibraryItem(media){
    // list of possible values (enum)
    const STATUSES = {CHECKED_OUT: 'out', CHECKED_IN: 'in', LOST: 'lost'}

    // decorating/adding functionality to an existing object
    media.status = STATUSES.CHECKED_IN;

    // methods
    media.checkIn = function(){
        this.status = STATUSES.CHECKED_IN;
    }

    media.checkOut = function(){
        this.status = STATUSES.CHECKED_OUT;
    }

    media.isAvailable = function(){
        return this.status === STATUSES.CHECKED_IN;
    }

    return media;
}
function CartItem(media,removeFn){
    // list of possible values (enum)
    media.remove=function(){removeFn(this)};
    media.qty=1;
    return media;
}
function Book(title, pages,price){
    this.pages = pages;
    this.title = title || 'Default Title';
    this.id = Math.floor(Math.random() * 10e16);
    this.price=price;
}

// same as above using class syntax
class Movie{
    constructor(title, runningTime,price){
        this.runningTime = runningTime;
        this.title = title || 'Default Title';
        this.id = Math.floor(Math.random() * 10e16);
        this.price=price;
    }
}

//LibraryItem.prototype.catalog = '201.34';

let book = new LibraryItem(new Book('Interaction Design', 200));
let movie = new LibraryItem(new Movie('Paw Patrol!', 78));
let book2 = new Book('Interaction Design', 200);
let libraryBook = new LibraryItem(book2);

// checkout
book.checkOut();
// title (composite)
//book.media.title;
// title (decorator)
//book.title;
console.log(book2, libraryBook);
console.log(book, book2, movie);

//console.log(book.media.constructor.name, book, movie.constructor.name, movie);