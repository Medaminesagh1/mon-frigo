<script setup>
import { reactive, onMounted } from 'vue';
import Produit from '@/produit';
import ProductListItem from './ProductListItem.vue'
import ProductForm from './ProductForm.vue';
import ProductSearchListItem from './ProductSearchListItem.vue'
import ProductSearch from './ProductSearch.vue';

const listeP = reactive([]);

const listeP_Recherche = reactive([]);

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

function handlerAdd(nom,qte,photo) {
  if (nom == "lait" || nom == "Tomates" || nom == "Jambon") {
    photo= "https://webmmi.iut-tlse3.fr//~pecatte//frigo//public//images//" + nom;
  }
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const fetchOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ nom : nom, qte:qte, photo:photo}),
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
  if(produit.qte<1){
    handlerDelete(produit.id)
  }else{
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
  fetch(url,fetchOptions) // Assurez-vous que votre API attend l'id dans l'URL
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

function handlerRecherche(l) {
  console.log(l);
  const fetchOptions = {
    method: "GET"
  }
  fetch(url + "?search=" + l, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      listeP_Recherche.splice(0, listeP_Recherche.length);
      dataJSON.forEach((v) => listeP_Recherche.push(new Produit(v.id, v.nom, v.qte, v.photo)));
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
    <ProductForm @addP="handlerAdd"></ProductForm>
    <h2>Mes produits</h2>
    <ul>
        <ProductListItem v-for="(produit,index) of listeP" :key="produit.id" :produit="produit" :indexP="index"
            :deleteP="handlerDelete" :SetQteP="handlerSetQte">
        </ProductListItem>
    </ul>
    <ProductSearch @searchP="handlerRecherche"/>
    <ul>
      <ProductSearchListItem v-for="(produit,index) of listeP_Recherche" :key="produit.id" :produit="produit" :indexP="index">
      </ProductSearchListItem>
    </ul>
    
</template>
<style></style>