<script setup>
defineProps(["produit", "indexP"]);
const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/e/e6/Pas_d%27image_disponible.svg";
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="product-card">
                    <div class="product-info">
                        {{ produit.pourAfficher() }}
                        <v-img :src="produit.photo || defaultImage" class="product-image" />
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.product-card {
    width: 200px;
    margin: 10px;
}

.product-info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-image {
    width: 100%;
    max-height: 100px;
    object-fit: contain;
    margin-bottom: 10px;
}
</style>