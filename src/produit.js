// un produit
export default class Produit {
    constructor(id,nom,qte,photo) { 
      this._id =id;
      this._nom = nom;
      this._qte = qte;
      this._photo=photo;
      
    }
    get id() {
      return this._id;
    }
    get nom() {
      return this._nom;
    }
    get qte() {
      return this._qte;
    }
    get photo(){
      return this._photo;
    }
   
    // modifier la quantité du produit
    SetQte(qte){
      this._qte=qte;
    }
    pourAfficher() {
      return `${this._nom} (quantité:${this._qte})`;
    }
  }
  