<script setup>
defineProps(["produit", "indexP", "deleteP", "SetQteP"]);
const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/e/e6/Pas_d%27image_disponible.svg";
let showButtons = true; // pour que les boutons ne s'affichent que dans la première photo
</script>

<template>
  <v-container>
    <div class="frigo-container">
      <v-row>
        <v-col v-for="n in produit.qte" :key="n">
          <v-card class="product-card">
            <div class="product-info">
              <v-row>
                <v-col>
                  <v-card-title class="product-title">{{ produit.nom }}</v-card-title>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-subtitle class="product-subtitle">Quantité: {{ produit.qte }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-img v-if="produit.photo" :src="produit.photo" alt="Image du produit" class="product-image"></v-img>
              <v-img v-else :src="defaultImage" alt="Image par défaut" class="product-image"></v-img>
            </div>
            <div v-if="showButtons && n === 1" class="button-group has-buttons"> <!-- Ajoutez la classe has-buttons -->
              <v-btn @click="deleteP(produit.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn @click="SetQteP(produit, produit.qte + 1)" icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn @click="SetQteP(produit, produit.qte - 1)" icon>
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
.frigo-container {
  background: url('../assets/frrrr.png') center center no-repeat; 
  background-size: cover; 
  border: 5px solid #023e46; 
  padding: 20px; 
}

.product-card {
  width: 240px; 
  margin: 10px;
  border: 2px solid #023e46; 
  border-radius: 10px; 
  overflow: hidden; 
}

.product-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
}

.product-subtitle {
  font-size: 14px;
  color: #888;
}

.product-image {
  width: 100%;
  height: 150px; 
}

.button-group {
  display: flex;
  justify-content: space-around;
}
</style>