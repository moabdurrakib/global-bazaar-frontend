<template>
  <div>
    <div class="backdrop"></div>
    <a class="backtop fas fa-arrow-up" href="#"></a>
    <HeaderPart />

    <NavBar />
    <CartSideBar />
    <MobileMenu />

    <!-- Content part -->
    <!-- <router-view> </router-view> -->
    <router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>

    <NewsLetter />
    <FooterPart />
  </div>
</template>
<script setup>
import { RouterView } from "vue-router";
import {
  HeaderPart,
  CartSideBar,
  NavBar,
  MobileMenu,
  NewsLetter,
  FooterPart,
} from "@/components";
</script>

<style>
.section.news-part {
  background: url(assets/images/newsletter.jpg) no-repeat center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-to,
.fade-leave-from{
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
