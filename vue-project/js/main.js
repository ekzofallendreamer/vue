Vue.component('product-review', {
    template: `
    
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
 <b>Please correct the following error(s):</b>
 <ul>
   <li v-for="error in errors">{{ error }}</li>
 </ul>
</p>

 <p>
   <label for="name">Name:</label>
   <input id="name" v-model="name" placeholder="name">
 </p>

 <p>
   <label for="review">Review:</label>
   <textarea id="review" v-model="review"></textarea>
 </p>

 <p>
   <label for="rating">Rating:</label>
   <select id="rating" v-model.number="rating">
     <option>5</option>
     <option>4</option>
     <option>3</option>
     <option>2</option>
     <option>1</option>
   </select>
 </p>

 <p>
   <input type="submit" value="Submit"> 
 </p>

 <p>
 <label for="question">Would you recommend this product?</label>
 <div class="radio">

    <p class="radio1">
    <input type="radio" 
    name="question"
    v-model="question"
    id="Yes"
    value="Yes">
    Yes</p>
    
    <p class="radio2">
    <input type="radio" 
    name="question"
    v-model="question"
    id="No"
    value="No">
    No</p>
</div>
</p>

 </form>
  `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
     },
 
    methods:{
        onSubmit() {
            if(this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
            }
         },
         
        addReview(productReview) {
            this.reviews.push(productReview)
        } 
     }     
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    
    <div class="product">

    <div class="product-image">
      <img :src="image" :alt="altText" />
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
            <p>{{ description }}</p>
         <a :href="link">More products like this</a>
            <p v-if="inStock">In Stock</p>
            <p v-else class="outofstock">Out of Stock</p>
      <span v-if="onSale">On Sale</span>
      <span v-else>Out of Sale</span>

      <product-details></product-details>
      
      <p>Shipping: {{ shipping }}</p>

      <div
      class="color-box"
      v-for="(variant, index) in variants"
      :key="variant.variantId"
      :style="{ backgroundColor:variant.variantColor }"
      @mouseover="updateProduct(index)"
      ></div>


      <ul>
         <li v-for="size in sizes">{{ size }}</li>
      </ul>
        <div>
      <button
         v-on:click="addToCart"
         :disabled="!inStock"
         :class="{ disabledButton: !inStock }"
      >
         Add to cart
      </button>
      </div>
    </div>
    <div>
<h2>Reviews</h2>
<p v-if="!reviews.length">There are no reviews yet.</p>
<ul>
  <li v-for="review in reviews">
  <p>{{ review.name }}</p>
  <p>Rating: {{ review.rating }}</p>
  <p>{{ review.review }}</p>
  </li>
</ul>
</div>

    
</div>
</div>
</div>

  `,
  
  
    data() {
        return {
        product: "Socks",
        brand: 'Vue Mastery',
        selectedVariant: 0,
        sale: "On Sale!",
        description: "A pair of warm, fuzzy socks",
        altText: "A pair of warm, fuzzy socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        reviews: [],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0
            }
         ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],         
    }},
    methods: {
        addToCart() {
            this.$emit('add-to-cart',
            this.variants[this.selectedVariant].variantId);
        },         
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }
     },
     computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity;
        },
        onSale() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
         }
     }                          
})

Vue.component('product-details', {
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `,
    data() {
        return {
            details: ['80% cotton', '20% polyester', 'Gender-neutral']
        }
    }
})
 
 let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeFromCart() {
            this.cart.pop(id);
        }
    }
 })
 
 