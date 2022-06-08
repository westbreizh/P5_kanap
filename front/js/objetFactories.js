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
 * @this fait référence à notre objet en construction
 */
class KanapLS { 
    constructor(){
        this._id = id;
        this.color = getColorChoice(); 
        this.quantity = getQuantityChoice(); 
    }
}



/**
 * Création d'une classe Contact    
 * @constructor appelé par new Contact, construit notre nouvel objet js de la classe contact
 * @param {arrayProductOrderId}  un tableau des identifiants des canapés sélectionnés
 * @this fait référence à notre objet en construction
 */

class Contact{
    constructor(arrayProductOrderId){
        this.lastName = lastNameInput.value ;
        this.firstName = firstNameInput.value;
        this.adress = addressInput.value ;
        this.city = cityInput.value;
        this.email = emailInput.value;
        this.arrayProduct = arrayProductOrderId;
    }
}

