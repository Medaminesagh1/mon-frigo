<script setup>
import { ref } from "vue";

defineProps(["Product"]);

const emit = defineEmits(["searchP"]);

const recherche=ref("");

function handlerSubmitRecherche() {
  emit("searchP", recherche.value);
  recherche.value = "";
}

</script>

<template>
    <div class="search">
        <h4 class="title">Rechercher un aliment: </h4>
        <form @submit.prevent="handlerSubmitRecherche">
            <input  type="text" v-model="recherche" placeholder="Rechercher ?" id="recherche"/>
            <button type="submit">
                Rechercher
            </button>
        </form>
    </div>
</template>