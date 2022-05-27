/**
 * Création d'une classe Canap    
 * @constructor appelé par newCanap, construit notre nouvel objet js de la classe Canap
 * @param {jsonCanap}  l'objet au format json ayant les informations sur le canapé.
 * @this   fait référence à notre objet en construction
 * 
 */


class Canap{
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