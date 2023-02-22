<script setup>
import { useSlider, useCategory, useProduct } from "@/stores";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

import { ProductCard ,ProductPrice} from "@/components/product";
import {HomeSlider,CategoryScreen, ProductScreen} from "@/components/skeleton";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper";

const modules = ref([Pagination, Autoplay]);
const newSlide = ref([Navigation, Autoplay]);

// Silder section

const slider = useSlider();
const cat = useCategory();
const pro = useProduct();

const { sliders } = storeToRefs(slider);
const { categories } = storeToRefs(cat);
const { products, popular, sales, winter, newItems, feature } =
  storeToRefs(pro);

onMounted(() => {
  slider.getData();
  cat.getData();
  pro.getData();
  pro.getData("sale");
  pro.getData("popular");
  pro.getData("winter");
  pro.getData("new");
  pro.getData("feature");
});

//slider section end
</script>

<template>
  <div>
    <section class="banner-part">
      <div class="">
        <div class="row">
          <div class="col-lg-12 order-0 order-lg-1 order-xl-1">
            <div class="home-grid-slider slider-arrow slider-dots">
            <template v-if="sliders.data">
              <swiper
                :spaceBetween="30"
                :pagination="{
                  clickable: true,
                }"
                :loop="true"
                :autoplay="{
                  delay: 2000,
                }"
                :modules="modules"
                class="mySwiper"
              >
                <swiper-slide
                  v-for="(slider, index) in sliders.data"
                  :key="index"
                  ><a href="#"><img :src="$filters.makeImagePath(slider.image)" alt="" /></a
                ></swiper-slide>
              </swiper>
            </template>
            <template v-else>
            <HomeSlider/>  
            </template>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section suggest-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h3 style="float: left">SHOP BY CATEGORIES</h3>
            </div>
          </div>
        </div>

        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          <template v-if="categories.data">
            <div
            class="col"
            v-for="(category, index) in categories.data"
            :key="index"
          >
            <div class="product-card">
              <ul>
                <li>
                  <a class="suggest-card" href="shop-4column.html">
                    <img :src="$filters.makeImagePath(category.image)" alt="" />
                  </a>
                </li>
              </ul>

              <h6 class="text-center mt-2">{{ category.name }}</h6>
            </div>
          </div>
          </template>
          <template v-else>
          <CategoryScreen :dataAmount="10"/>
          </template>
        </div>
      </div>
    </section>

    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Popular items</h2>
            </div>
          </div>
        </div>
        
        <template v-if="sales.data">
          <ProductCard :products="sales" />
        </template>
        <template v-else>
        <ProductScreen :dataAmount="10"/>
        </template>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>recently sold items</h2>
            </div>
          </div>
        </div>
        <template v-if="sales.data">
        <ProductCard :products="sales" />
        </template>
        <template v-else>
        <ProductScreen :dataAmount="10"/>
        </template>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Winter items</h2>
            </div>
          </div>
        </div>
        <template v-if="sales.data">
        <ProductCard :products="winter" />
        </template>
        <template v-else>
        <ProductScreen :dataAmount="10"/>
        </template>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Feature items</h2>
            </div>
          </div>
        </div>
        <template v-if="sales.data">
        <ProductCard :products="feature" />
        </template>
        <template v-else>
        <ProductScreen :dataAmount="10"/>
        </template>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section newitem-part">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="section-heading">
              <h2>collected new items</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <ul class="new-slider slider-arrow">
              <template v-if="newItems.data">
                <swiper
                :slidesPerView="5"
                :slidesPerGroup="5"
                :loop="true"
                :autoplay="{
                  delay: 2000,
                }"
                :loopFillGroupWithBlank="true"
                :navigation="true"
                :modules="newSlide"
                class="mySwiper"
              >
                <swiper-slide
                  v-for="(product, index) in newItems.data"
                  :key="index"
                  ><li>
                    <div class="product-card">
                      <div class="product-media">
                        <div class="product-label">
                          <label class="label-text new">{{
                            product.conditions
                          }}</label>
                          <label class="label-text sale" v-if="product.discount"
                            >{{ product.discount }}%</label
                          >
                        </div>
                        <button class="product-wish wish">
                          <i class="fas fa-heart"></i></button
                        ><router-link
                          :to="{ name: 'product.details' }"
                          class="product-image"
                        >
                          <img :src="$filters.makeImagePath(product.thumbnail)" alt="product"
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
                        <ProductPrice
                          :price="product.price"
                          :discount="product.discount"
                        />
                        <button class="product-add" title="Add to Cart">
                          <i class="fas fa-shopping-basket"></i><span>Add</span>
                        </button>
                      </div>
                    </div>
                  </li>
                  </swiper-slide
                >
              </swiper>
              </template >
              <template v-else>
                <swiper
                :slidesPerView="5"
                :slidesPerGroup="5"
                :loop="true"
                :autoplay="{
                  delay: 2000,
                }"
                :loopFillGroupWithBlank="true"
                :navigation="true"
                :modules="newSlide"
                class="mySwiper"
              >
                <swiper-slide
                  v-for="(product, index) in dataItem=5"
                  :key="index"
                  ><li>
                    <div class="product-card">
                      <div class="product-media">
                        <div class="product-label">
                          <label class="label-text new">{{
                            product.conditions
                          }}</label>
                          <label class="label-text sale" v-if="product.discount"
                            >{{ product.discount }}%</label
                          >
                        </div>
                        <button class="product-wish wish">
                          <i class="fas fa-heart"></i></button
                        ><router-link
                          :to="{ name: 'product.details' }"
                          class="product-image"
                        >
                          <img src="@/assets/images/category/screen.png" alt="product"
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
                        <button class="product-add" title="Add to Cart">
                          <i class="fas fa-shopping-basket"></i><span>Add</span>
                        </button>
                      </div>
                    </div>
                  </li>
                  </swiper-slide
                >
              </swiper>
              </template>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>
