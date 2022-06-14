/**
 * Création d'une classe Canap    
 * @constructor appelé par new Canap, construit notre nouvel objet js de la classe Canap
 * @param {jsonCanap}  l'objet au format json  ayant les informations sur le canapé.
 * @this fait référence à notre objet en construction
 */


class Kanap{
    constructor(jsonCanap){
        this.colors = jsonCanap.colors;
        this._id = jsonCanap._id;
        this.name = jsonCanap.name;
        this.price = jsonCanap.price;
        this.imageUrl = jsonCanap.imageUrl;
        this.description = jsonCanap.description;
        this.altTxt = jsonCanap.altTxt;
        //jsonCanap && Object.assign(this,jsonCanap); métode plus rapide ...
    }
}

/**
 * Création d'une classe kanapLS   (LS pour local storage et non los angeles)
 * @constructor appelé par new KanapLS, construit notre nouvel objet js de la classe Canap
 * @param {_id}  l'identifiant du canapé en question 
 * @param {color}  la couleure du canapé choisi
 * @param {quantity}  la quantité souhaité du canapé choisi
 * @this fait référence à notre objet en construction
 */
class KanapLS { 
    constructor(id, colorChoice, quantityChoice){
        this._id = id;
        this.color = colorChoice; 
        this.quantity = quantityChoice; 
    }
}



