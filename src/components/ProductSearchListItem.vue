<script setup>
defineProps(["produit","indexP"]);
</script>
<template>
    <div v-if="produit">
        <li >
        {{ produit.pourAfficher() }}
        <img  :src="produit.photo" alt="Image du produit" />
    </li>
    </div>
   
</template>
<style scoped>
img{
    max-width: 100px; max-height: 100px;
}
</style>