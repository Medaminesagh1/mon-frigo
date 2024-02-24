<script setup>
defineProps(["produit","indexP","deleteP","SetQteP"]);
</script>
<template>
    <li>
        {{ produit.pourAfficher() }}
        <img  :src="produit.photo" alt="Image du produit" />
        <button @click="deleteP(produit.id)">Supprimer ce produit</button>
        <button @click="SetQteP(produit,produit.qte+1)">Augmanter_QTE</button>
        <button @click="SetQteP(produit,produit.qte-1)">Diminuer_QTE</button>
    </li>
</template>
<style scoped>
img{
    max-width: 100px; max-height: 100px;
}
</style>