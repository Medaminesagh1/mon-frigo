<script setup>
import { ref } from "vue";

const emit = defineEmits(["searchP"]);

const recherche = ref("");

function handlerSubmitRecherche() {
    emit("searchP", recherche.value);
    recherche.value = "";
}
</script>

<template>
    <v-container>
        
        <h2 class="search-title">Recherche Produit</h2>

        <!-- Formulaire de recherche -->
        <v-row>
            <v-col>
                <v-form @submit.prevent="handlerSubmitRecherche" class="search-form">
                    <v-text-field v-model="recherche" label="Rechercher" class="search-input" required></v-text-field>
                    <v-btn type="submit" class="search-button" icon>
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

.search-form {
    display: flex;
    align-items: center;
}

.search-input {
    flex-grow: 1;
}

.search-button {
  margin: 0.5rem;
  background-color:  #0cd3d3
}

.search-title {
    font-size: 24px;
    font-weight: bold;
    color: #0cd3d3;
    text-align: center;
    margin-bottom: 20px; 
}
</style>