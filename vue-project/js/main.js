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
      <ul>
         <li v-for="detail in details">{{ detail }}</li>
      </ul>
      
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

      

      <div class="cart">
         <p>Cart({{ cart }})</p>
      </div>
      <button
         v-on:click="addToCart"
         :disabled="!inStock"
         :class="{ disabledButton: !inStock }"
      >
         Add to cart
      </button>
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
        altText: "A pair of warm, fuzzy socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
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
        cart: 0          
    }},
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        addToCart() {
            this.$emit('add-to-cart');
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
 let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    }
 })
 
 