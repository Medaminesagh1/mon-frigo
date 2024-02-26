<script setup>
import { ref } from "vue";

const nom = ref("");
const qte = ref("");
const photo = ref("");

const emit = defineEmits(["addP"]);

function handlerSubmit() {
  emit("addP", nom.value, qte.value, photo.value);
  nom.value = "";
  qte.value = null;
  photo.value = "";
}
</script>

<template>
  <form @submit.prevent="handlerSubmit" class="product-form">
    <v-row align="center">
      <v-col>
        <v-text-field v-model="nom" label="Produit" required></v-text-field>
      </v-col>
      <v-col>
        <v-text-field type="number" v-model="qte" label="Quantité"  min="1" required></v-text-field>
      </v-col>
      <v-col>
        <v-text-field type="url" v-model="photo" label="URL de photo"></v-text-field>
      </v-col>
      <v-col class="align-center">
        <v-btn type="submit" class="product-button">Ajouter</v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<style scoped>
.product-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #0cd3d3;
  border-radius: 5px;
}

.align-center {
  align-items: center;
}

.product-button{
  margin: 0.5rem;
  background-color:  #0cd3d3
}
</style>