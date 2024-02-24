<script setup>

import { ref } from "vue";

const nom = ref("");
const qte =ref();
const photo=ref("")


const emit = defineEmits(["addP"]);

function handlerSubmit() {
  emit("addP", nom.value,qte.value,photo.value);
  nom.value="";
  qte.value=null;
  photo.value="";
}
</script>

<template>
<form @submit.prevent="handlerSubmit">
    <input type="text" v-model="nom" placeholder="produit" id="nom"  required />
    <input type="number" v-model="qte" placeholder="quantité"  min="1" id="qte" required />
    <input type="url" v-model="photo" placeholder="urlphoto" id="urlphoto"/>
    <input type="submit" value="Ajouter">
</form>
</template>

<style scoped>
</style>