/** 
 * fonction de modification de la valeur de la propriété quantity de l'objet canapKart dans le local storage au click sur le bouton 
 * @param {id}, l'identifiant, le numéro du canapé 
 * @param {color}, la couleur du canapé 
 * @param {quantity}, la quantité des canapés nouvellement modifié par le client
*/

function changeQuantity(id, color, quantity) {
    let jsonArray = localStorage.getItem("arrayKey"); // récupère le tableau dans le local storage
    let array = JSON.parse(jsonArray); // on transforme l'objet json en js
    for (let canapKart of array) {  // pour chaque canapé dans le local storage
        if (canapKart._id == id && canapKart.color == color) { // on vérifie si il correspond au canapé dont la quantité est modifié par l'utilisateur
            canapKart.quantity = quantity; // on affecte la nouvelle quantitée
            jsonArray = JSON.stringify(array);// on transforme l'objet js en json
            localStorage.setItem("arrayKey", jsonArray); // on réinitialise le tableau dans le local storage
            break;
        }
    }
}


/** 
* fonction de récupération  de l'id, de la couleur et de la quantité du canapé dont la quantité est modifié via le input
*puis appel de la fonction  "changequantity" pour modification de la valeur quantity dans le local storage
*@param{event} l'objet evenement renoyé automatiquement par l'api au gestionnaire d'évenement
*/

function recupValueAndChangeQuantity(event) {
    let laCible= event.currentTarget;
    let articleChange = laCible.closest(".cart__item"); // la méthode closest nous permet de partir de l'élément input pour remonter à l'élément parent ayant pour class cart_item 
    let id = articleChange.dataset.id;
    let color = articleChange.dataset.color;
    let quantity = laCible.value;
    changeQuantity(id, color, quantity);
}



/** 
* récupération  de l'id et de la couleur  du canapé supprimé
*suppresseion du canapé dans le dom, puis appel de la fonction deletCanapInlocalStorage pour suppression de canpé dans le localStorage
*@param{event} l'objet evenement renoyé automatiquement par l'api au gestionnaire d'évenement
*/


function recupInfoCanapAndDelet(Event) {
let laCible= Event.currentTarget; // on récupère l'élément cliqué 
let articleDelete = laCible.closest(".cart__item"); // la méthode closest nous permet de partir de l'élément input pour remonter à l'élément parent ayant pour class cart_item 
let id = articleDelete.dataset.id; // on récupère l'id via l'attribut contenu dans l'élément article
let color = articleDelete.dataset.color;  // on récupère la couleure via l'attribut contenu dans l'élément article
articleDelete.remove(); // on suprime l'élément article du dom
deletCanapInlocalStorage(id, color) // appel de la fonction 

}



/** 
* fonction supprimant le canapé cliqué dans le localStorage
*@param{id} l'identifiant du canapé sélectionné
*@param{color} la couleur du canapé sélectionné
*/

function deletCanapInlocalStorage(id, color) {
    let jsonArray = localStorage.getItem("arrayKey"); // récupère le tableau dans le local storage
    let array = JSON.parse(jsonArray); 
    for (let canapKart of array) {  // on récupère le bon canapé du local storage qui correspond à celui dont la qauntité a été changé par l 'utilisateur
        if (canapKart._id == id && canapKart.color == color) {
            let index = array.indexOf(canapKart); // on récupère l'index, la position du canapé dans le tableau
            array.splice(index,1); // on enlève le canapé du tableau
            jsonArray = JSON.stringify(array); // on le transforme en objet json
            localStorage.setItem("arrayKey", jsonArray); // on réinitialise le tableau dans le local storage
            break;
        }
    }
}



/** 
* fonction calculant et affichant le nombre total de canapé commandé
*/


function calculAndInsertTotalQuantity() {
    let totalQuantityMarkup= document.getElementById("totalQuantity");
    let jsonArray = localStorage.getItem("arrayKey"); // récupère le tableau dans le local storage
    let array = JSON.parse(jsonArray);
    let totalQuantity = 0 ; // on déclare la vairiable  
    for (let canapKart of array) {  // pour chaque objet canapKart du tableau du localstorage
        let quantity = parseInt (canapKart.quantity); //on récupère la qauntité
        totalQuantity += quantity; // on adittionne la valeur quantity à totalQuantity   
        }
    totalQuantityMarkup.innerText=`${totalQuantity}`;
    }

/** 
* fonction calculant et affichant le prix total 
*/

function calculAndInsertTotalPrice() {
    let jsonArray = localStorage.getItem("arrayKey"); // récupère le tableau dans le local storage
    let array = JSON.parse(jsonArray);
    let totalPrice = 0 ; // on déclare et initialise la variable 
    let totalPriceMarkup= document.getElementById("totalPrice");
    totalPriceMarkup.innerText=`${totalPrice}`;

    for (let canapKart of array) {  // pour chaque objet canapKart du tableau du localstorage
        let id = canapKart._id; //on récupère l'identifiant
        let quantity = parseInt( canapKart.quantity) // on récupère la quantité depuis le localStorage
        let promisePrice = fetch(` http://localhost:3000/api/products/${id} `)//on récupère le prix depuis le serveur
        .then(data => data.json())
        .then(jsonCanap => new Canap(jsonCanap))  
        .then (canap => parseInt (canap.price))
        .then (price => price*quantity )
        .then (prices => totalPrice += prices)
        .then (totalPrice => totalPriceMarkup.innerText=`${totalPrice}`)
        }
}


        



