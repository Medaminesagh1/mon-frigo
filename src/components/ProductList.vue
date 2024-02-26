<script setup>
import { reactive, onMounted , ref } from 'vue';
import Produit from '@/produit';
import ProductListItem from './ProductListItem.vue'
import ProductForm from './ProductForm.vue';
import ProductSearchListItem from './ProductSearchListItem.vue'
import ProductSearch from './ProductSearch.vue';

const listeP = reactive([]);

const listeP_Recherche = reactive([]);
const resultatsRechercheEffectuee = ref(false);


const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/23/produits"

// Afficher le contenu du frigo

function getProducts() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // -- vider la liste des produits
      listeP.splice(0, listeP.length);
      // pour chaque donnée renvoyée par l'API
      //  créer un objet instance de la classe Produit
      //  et l'ajouter dans la liste listeP
      dataJSON.forEach((v) => listeP.push(new Produit(v.id, v.nom, v.qte, v.photo)));
    })
    .catch((error) => console.log(error));
}
// Ajouter un nouveau produit au frigo

function handlerAdd(nom, qte, photo) {
  // pour s'assurer que le nom n'est pas composé uniquement d'espaces
  if (!nom.trim()) {
    console.error("Le nom du produit ne peut pas être vide.")
    alert("Le nom du produit ne peut pas être vide.");
    return; 
  }
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ nom: nom, qte: qte, photo: photo }),
  };

  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getProducts();
    })
    .catch((error) => console.log(error));
}

// Supprimer un produit du frigo 

function handlerDelete(id) {
  const fetchOptions = {
    method: "DELETE",
  };
  // -- l'id du produit à supprimer doit être
  //  ajouté à la fin de l'url
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getProducts();
    })
    .catch((error) => console.log(error));
}

// Ajouter 1 à la qte d’un produit présent dans le frigo
// Supprimer 1 à la qte d’un produit présent dans le frigo

function handlerSetQte(produit, nouvelleQuantite) {
  produit.SetQte(nouvelleQuantite);
  if (produit.qte < 1) {
    handlerDelete(produit.id)
  } else {
    // Entête http pour la requête AJAX
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // Ajoutez l'id du produit à l'objet JSON
    const produitToUpdate = {
      id: produit.id,
      nom: produit.nom,
      qte: produit.qte,
      photo: produit.photo,
    };

    const fetchOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(produitToUpdate),
    };
    // La requête AJAX
    fetch(url, fetchOptions) // Assurez-vous que votre API attend l'id dans l'URL
      .then((response) => response.json())
      .then((dataJSON) => {
        console.log(dataJSON);
        // Actualisez la liste des produits
        getProducts();
      })
      .catch((error) => console.error(error));
  }

}

// Rechercher des produits

function handlerRecherche(lettres) {
  // pour s'assurer qu'il n'y a pas uniquement des espaces 
  if(!lettres.trim()){
   alert("il faut saisir le nom de produit")
   return;
  }
  console.log(lettres);
  const fetchOptions = {
    method: "GET"
  }
  fetch(url + "?search=" + lettres, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      listeP_Recherche.splice(0, listeP_Recherche.length);
      dataJSON.forEach((v) => listeP_Recherche.push(new Produit(v.id, v.nom, v.qte, v.photo)));

      resultatsRechercheEffectuee.value = true;
    })
    .catch((error) => console.log(error));
  }
  


// -- fonction du cycle de vie du composant
// exécutée 1 seule fois à la création
onMounted(() => {
  getProducts();
});
</script>
<template>
  <v-container>
    <ProductSearch @searchP="handlerRecherche" />
    <div v-if="listeP_Recherche.length === 0 && resultatsRechercheEffectuee" class="pas_de_resultat">
      Aucun résultat trouvé ,mais tu peux ajouter ce produit 
    </div>
    <ul v-else>
      <ProductSearchListItem v-for="(produit, index) of listeP_Recherche" :key="produit.id" :produit="produit"
        :indexP="index" />
    </ul>

    <!-- Formulaire d'ajout de produit -->
    <v-row>
      <v-col>
        <ProductForm @addP="handlerAdd" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3 class="listeProduit">Mes produits</h3>
      </v-col>
    </v-row>
    <ul>
      <ProductListItem v-for="(produit, index) of listeP" :key="produit.id" :produit="produit" :indexP="index"
        :deleteP="handlerDelete" :SetQteP="handlerSetQte">
      </ProductListItem>
    </ul>
  </v-container>
</template>
<style scoped>
.listeProduit {
  font-size: 24px;
  font-weight: bold;
  color: #0cd3d3;
  text-align: center;
  margin-bottom: 1rem;
}
.pas_de_resultat{
  font-size: 18px;
  font-weight: bold;
  color: #036363;
  text-align: center;
  padding: 20px;
  background-color: #eee;
  border-radius: 8px;
  margin-top: 20px;
}
</style>