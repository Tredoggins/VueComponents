const Container=Vue.component('Container',{
    data:function(){
        return {
            cart:new CartCollection()
                .addItem(new Book('Interaction Design', 200,19.99))
        }
    },
    methods:{
        addToCart:function (item){
            this.cart.addItem(item);
        }
    },
    template:`<div>
                <library @addToCart="addToCart"></library>
                <h1>Cart</h1>
                <div class="card-columns">
                    <cart-item v-for="item in cart" :item="item"></cart-item>
                    <div class="card">
                        <p>In Cart: {{cart.length}}</p>
                    </div>
                </div>
            </div>`
})
const Library = Vue.component('Library', {
    // this function is run AFTER the props have been passed in
    data() {
        // without chaining
        // let libraryCollection = new LibraryCollection();
        // libraryCollection.addItem(new Book('Interaction Design', 200));
        // libraryCollection.addItem(new Movie('Paw Patrol!', 78));
        // libraryCollection.addItem(new Movie('Harriet', 122));
        // libraryCollection.addItem(new Book('Brown Bear, Brown Bear', 0));

        return {
            //library: libraryCollection
            library: new LibraryCollection()
                .addItem(new Book('Interaction Design', 200,19.99))
                .addItem(new Movie('Paw Patrol!', 78,19.99))
                .addItem(new Movie('Harriet', 122,15.99))
                .addItem(new Book('Brown Bear, Brown Bear', 0,2.00))
        }
    },
    methods: {
        addToCart:function (item){
            this.$emit('addToCart',item)
        }
    },
    template: `
       <div>
            <h1>Library</h1>
            <div class="card-columns">
            
                <library-item v-for="item in library" :item="item" @addToCart="addToCart"></library-item>
                <div class="card">
                    <p>Checked out: {{library.checkedOutItems().length}}</p>
                </div>
            </div>
      </div>
    `
})

const LibraryItemComponent = Vue.component('LibraryItem', {
    // values/bindings passed to this component
    props: {
        item: Object
    },
    methods: {
        addToCart:function (){
            this.$emit('addToCart',this.item)
        }
    },
    computed: {
      typeOfItem(){
          return this.item.constructor.name;
      }
    },

    // the view
    template: `
            <div class="card" :class="item.isAvailable() ? 'border-success' : 'border-warning'" style="border-width: 3px;">
<!--                <h3 class="card-title">{{item.title}}</h3>-->
<!--                <p class="card-text" v-if="item.constructor.name == 'Book'">Pages: {{item.pages}}</p>-->
<!--                <p class="card-text" v-if="item.runningTime">Running Time: {{item.runningTime}}</p>-->
            <div class="card-body">
              <component :is="typeOfItem" :item="item"></component>
            </div>
            <div class="card-footer">
              <button @click="item.checkOut()" class="btn btn-secondary">Check Out</button>
              <button @click="item.checkIn()" class="btn btn-secondary">Check In</button>
              <button @click="addToCart()" class="btn btn-secondary">Add To Cart</button>
            </div>
            </div>
        `,
});
const CartItemComponent = Vue.component('CartItem', {
    // values/bindings passed to this component
    props: {
        item: Object
    },

    computed: {
        typeOfItem(){
            return this.item.constructor.name;
        }
    },

    // the view
    template: `
            <div class="card" style="border-width: 3px;">
<!--                <h3 class="card-title">{{item.title}}</h3>-->
<!--                <p class="card-text" v-if="item.constructor.name == 'Book'">Pages: {{item.pages}}</p>-->
<!--                <p class="card-text" v-if="item.runningTime">Running Time: {{item.runningTime}}</p>-->
            <div class="card-body">
              <component :is="typeOfItem" :item="item"></component>
            </div>
            <div class="card-footer">
              <button @click="item.remove()" class="btn btn-secondary">Remove From Cart</button>
            </div>
            </div>
        `,
});
const BookComponent = Vue.component('Book', {
    props: {
        item: Book
    },

    template: `
            <div class="book">
                <h3 class="card-title">{{item.title}}</h3>
                <p class="card-text">Pages: {{item.pages}}</p>
            </div>
        `,
});

const MovieComponent = Vue.component('Movie', {
    props: {
        item: Movie
    },

    template: `
            <div class="movie">
                <h3 class="card-title">{{item.title}}</h3>
                <p class="card-text">Running Time: {{item.runningTime}}</p>
            </div>
        `,
});