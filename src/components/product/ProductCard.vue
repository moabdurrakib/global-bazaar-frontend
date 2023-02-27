<script setup>
import { useCart, useNotification, useAuth } from "@/stores";
import { ref } from "@vue/reactivity";
import { ProductPrice } from "@/components/product";

const cart = useCart();
const auth = useAuth();
const notify = useNotification();

const props = defineProps({
  products: {
    type: Object,
    required: true,
  },
});

const price = ref();
function addToCart(product) {
  if (product.discount) {
    var firstPrice = product.price;
    var discount = product.discount / 100;
    var totalPrice = firstPrice - firstPrice * discount;
    price.value = totalPrice.toFixed();
  } else {
    price.value = product.price;
  }

  cart.addToCart({
    id: product.id,
    name: product.name,
    price: price.value,
    thumbnail: product.thumbnail,
  });
  notify.Success(`${product.name} Added Your Cart`);
}

// Add to Wishlist

const addToWishlist = () => {
  if (auth.user.data) {
    alert("User already logged in");
  } else {
    $("#login-modal").modal("show");
  }
};
</script>
<template>
  <div>
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
      <div class="col" v-for="(product, index) in products.data">
        <div class="product-card">
          <div class="product-media">
            <div class="product-label">
              <label class="label-text new">{{ product.conditions }}</label>
              <label class="label-text sale" v-if="product.discount"
                >{{ product.discount }}%</label
              >
            </div>
            <button
              class="product-wish wish"
              @click.prevent="addToWishlist(product)"
            >
              <i class="fas fa-heart"></i></button
            ><router-link
              :to="{ name: 'product.details' }"
              class="product-image"
            >
              <img
                :src="$filters.makeImagePath(product.thumbnail)"
                alt="product"
            /></router-link>
          </div>
          <div class="product-content">
            <h6 class="product-name">
              <router-link
                :to="{ name: 'product.details' }"
                class="product-image"
              >
                {{ product.name }}</router-link
              >
            </h6>
            <ProductPrice :price="product.price" :discount="product.discount" />
            <button
              class="product-add"
              title="Add to Cart"
              @click.prevent="addToCart(product)"
            >
              <i class="fas fa-shopping-basket"></i><span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
