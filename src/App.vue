<script setup>
  import MonFrigoHeader from './components/MonFrigoHeader.vue';
  import ProductList from './components/ProductList.vue';
</script>
<template>
  <v-app>
    <v-main>
<MonFrigoHeader></MonFrigoHeader>
<div class="product-list-container">
  <ProductList></ProductList>
  </div>

    </v-main>
  </v-app>
</template>
<style scoped>
.product-list-container {
  background: url('./assets/background-total.jpg') center center no-repeat;
  background-size: cover;
  position: relative;
  overflow: auto; 
  min-height: 100vh;
}


</style>

