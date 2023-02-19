<script setup>
import {ProductPrice} from "@/components/product"

const props = defineProps({
    products:{
        type:Object,
        required:true
    }
})
</script>
<template>
    <div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          <div class="col" v-for="(product,index) in products.data">
            <div class="product-card">
              <div class="product-media">
                <div class="product-label">
                  <label class="label-text new">{{product.conditions}}</label>
                  <label class="label-text sale" v-if="product.discount">{{product.discount}}%</label>
                </div>
                <button class="product-wish wish">
                  <i class="fas fa-heart"></i></button
                ><router-link
                  :to="{ name: 'product.details' }"
                  class="product-image"
                >
                  <img :src="product.thumbnail" alt="product"
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
                <ProductPrice :price="product.price" :discount="product.discount"/>
                <button class="product-add" title="Add to Cart">
                  <i class="fas fa-shopping-basket"></i><span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>