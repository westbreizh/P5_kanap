
// gestion de l'affichage des canapés dans le panier

let jsonArray = localStorage.getItem("arrayKey");  // on récupère le tableau des canapés du localStorage
let arrayLocalStorage = JSON.parse(jsonArray);  // on transforme Json en js


for (let kanapLS of arrayLocalStorage) { // pour chaque élément du tableau

    let _id = kanapLS._id; 

    fetch(`http://localhost:3000/api/products/${_id}`) // on recoit du serveur une promise dont on traite le résultat (data)
        .then(data => data.json()) // transformation des données en format json
        .then(jsonCanap => { 
            let kanap = new Kanap(jsonCanap);  // création de l'objet Canap

            let article = document.createElement("article"); // création de l'élement article
            article.classList.add("cart__item"); // on lui affecte l'attribut class cart_item
            article.setAttribute("data-id", `${_id}`); //ajout d'attribut data-id
            article.setAttribute("data-color", `${kanapLS.color}`); //ajout d'attribut data-color
            document.getElementById("cart__items").appendChild(article); // on injecte dans le dom le htmlElement article

            let imgContenair = document.createElement("div");
            imgContenair.classList.add("cart__item__img");
            article.appendChild(imgContenair);

            let image = document.createElement("img");
            image.setAttribute("src", `${kanap.imageUrl}`);
            image.setAttribute("alt", `${kanap.altTxt}`);
            imgContenair.appendChild(image);

            let cartItemContent = document.createElement("div");
            cartItemContent.classList.add("cart__item__content");
            article.appendChild(cartItemContent);

            let cartItemContentDescription = document.createElement("div");
            cartItemContent.classList.add("cart__item__content__description");
            cartItemContent.appendChild(cartItemContentDescription);

            let h2 = document.createElement("h2");
            h2.innerText = `${kanap.name}`;
            cartItemContentDescription.appendChild(h2);

            let p1 = document.createElement("p");
            p1.innerText = `${kanapLS.color}`;
            cartItemContentDescription.appendChild(p1);

            let p2 = document.createElement("p");
            p2.innerText = `${kanap.price} €`;
            cartItemContentDescription.appendChild(p2);

            let cartItemContentSettings = document.createElement("div");
            cartItemContentSettings.classList.add("cart__item__content__settings");
            cartItemContent.appendChild(cartItemContentSettings);

            let cartItemContentSettingsQuantity = document.createElement("div");
            cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
            cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

            let p3 = document.createElement("p");
            p3.innerText = "Qté : ";
            cartItemContentSettingsQuantity.appendChild(p3);

            let input = document.createElement("input");
            input.setAttribute("type", "number");
            input.setAttribute("class", "itemQuantity");
            input.setAttribute("name", "itemQuantity");
            input.setAttribute("min", "1");
            input.setAttribute("max", "99");
            input.setAttribute("value", `${kanapLS.quantity}`);
            cartItemContentSettingsQuantity.appendChild(input);
            input.addEventListener("change", recupValueAndChangeQuantity);
            input.addEventListener("change", calculAndInsertTotalPrice);
            input.addEventListener("change", calculAndInsertTotalQuantity);
              
            
            let cartItemContentSettingsDelete = document.createElement("div");
            cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
            cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
            cartItemContentSettingsDelete.addEventListener("click", recupInfoCanapAndDelet);
            cartItemContentSettingsDelete.addEventListener("click", calculAndInsertTotalQuantity);
            cartItemContentSettingsDelete.addEventListener("click", calculAndInsertTotalPrice);


            let p4 = document.createElement("p");
            p4.setAttribute("class", "deleteItem")
            p4.innerText = "Supprimer";
            cartItemContentSettingsDelete.appendChild(p4);
            
        })
}


// gestion de l'affichage de la quantité

calculAndInsertTotalQuantity();


// gestion de l'affichage du prix total

calculAndInsertTotalPrice();




// gestion du formulaire de saisie du panier


// gestion de validation de la saisie du prénom

let firstNameInput = document.getElementById("firstName"); // on récupère l'élément input du prénom
let firstNameError = document.getElementById("firstNameErrorMsg"); // on récupère l'élément où l'on va inserer le message d'erreur
let firstNameRegex = /^([a-zA-Z\xC0-\uFFFF]{1,20}[ \-\']{0,1}){1,3}$/; // on définit un objet regex

firstNameInput.addEventListener("keyup", () => { // Chaque fois que l'utilisateur saisie une donnée ...
  if ( firstNameRegex.test (firstNameInput.value )){ //  si la valeur saisie est correcte
    firstNameError.innerHTML = ""; // On réinitialise le contenu
  }
  else{
  // si le chanp est invalide
    firstNameError.innerHTML = "Veuillez renseigner un prénom valide svp !"; // On réinitialise le contenu
  }
});

// gestion de validation de la saisie du nom

let lastNameInput = document.getElementById("lastName"); // on récupère l'élément input du nom
let lastNameError = document.getElementById("lastNameErrorMsg"); // on récupère l'élément où l'on va inserer le message d'erreur
let lastNameRegex = /^([a-zA-Z\xC0-\uFFFF]{1,20}[ \-\']{0,1}){1,3}$/; // on définit un objet regex

lastNameInput.addEventListener("keyup", () => { // Chaque fois que l'utilisateur saisie une donnée ...
  if ( lastNameRegex.test (lastNameInput.value )){ //  si la valeur saisie est correcte
    lastNameError.innerHTML = ""; // On réinitialise le contenu
  }
  else{    // si le chanp est invalide
    lastNameError.innerHTML = "tu vas me filer un nom correct enf**!!"; // On réinitialise le contenu
  }
});


// gestion de validation de la saisie de l'adresse, 

let addressInput= document.getElementById("address"); // on récupère l'élément input de l'adresse
let addressError = document.getElementById("addressErrorMsg"); // on récupère l'élément où l'on va inserer le message d'erreur
let addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/ ; // on définit un objet regex

addressInput.addEventListener("keyup", () => { // Chaque fois que l'utilisateur saisie une donnée ...
  if ( addressRegex.test (addressInput.value )){ //  si la valeur saisie est correcte
    addressError.innerHTML = ""; // On réinitialise le contenu
  }
  else{ //  si le chanp est invalide
      addressError.innerHTML = "tu vas me filer une adresse correct enf**!!"; // On réinitialise le contenu
    }
});


// gestion de validation de la saisie de la ville

let cityInput = document.getElementById("city");
let cityError = document.getElementById("cityErrorMsg");
let cityRegex = /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/ ; // on définit un objet regex

cityInput.addEventListener("keyup", () => { // Chaque fois que l'utilisateur saisie une donnée ...
  if ( cityRegex.test (cityInput.value )){ //  si la valeur saisie est correcte
    cityError.innerHTML = ""; // On réinitialise le contenu
  }
  else{ //  si le chanp est invalide
      cityError.innerHTML = "Veuillez rentrer un nom de ville correct svp !"; // On réinitialise le contenu
    }
});


// gestion de validation de la saisie de l'email

let emailInput = document.getElementById("email");
let emailError = document.getElementById("emailErrorMsg");

emailInput.addEventListener("keyup", function (event) { // Chaque fois que l'utilisateur saisie une donnée, on vérifie que le champ du nom est valide. l'attribut patern  est testé et retourne dans l'objet event, validity,un objet validityState qui est un bouléin
  if (emailInput.validity.valid) {     // S'il y a un message d'erreur affiché et que le champ est valide, on retire l'erreur
    emailError.innerHTML = ""; // On réinitialise le contenu
  }
  else { // les données saisies sont invalides
    emailError.innerHTML = "Veuillez rentrez un email correct svp!"; // On réainitialise le contenu
  }
})


/**
 * Création d'un tableau de produit pour validation et commande
 * 
*/
function arrayProductOrder(){
let jsonArrayProductOrder = localStorage.getItem("arrayKey");  // on récupère le tableau des canapés du localStorage
let arrayProductOrder= JSON.parse(jsonArrayProductOrder);  // on transforme Json en js
let arrayProductOrderId = [];
for (let element of arrayProductOrder){
arrayProductOrderId.push(element._id);
}
return arrayProductOrderId;}


/**
 * Envoie au serveur des informations de la commande, qui en retour nous donne un numéro de commande 
 * @param {contact} objet contact ayant des attributs renseigants sur les données rentrées par l'utilisateur et un tableau des id des canapés choisis 
 */

function requestAndGoToConfirmationPage (contact) {  
  fetch(`http://localhost:3000/api/products/order`, { 
	  method: "POST",
	  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
    },
	body: JSON.stringify(contact)
  })
    .catch( () => console.log("ya un yeucou ds le tagepo!!"))
    .then(data => data.json())
    .then(numberOrder =>
      console.log("hello!!")
      //location.assign("./confirmation.html?id=${numberOrder}")
    )
};



/**
 * gestion de la transmission des données au serveur et de la redirection vers la page confirmation
 */


let orderButton = document.getElementById('order');

orderButton.addEventListener("click", function (event) {   // Chaque fois que l'utilisateur tente d'envoyer les données, on vérifie que les différents champs soient valide
  if (!(firstNameInput.validity.valid)  || !(lastNameInput.validity.valid) || !(addressInput.validity.valid) || !(cityInput.validity.valid) || !(emailInput.validity.valid)) // si un des champs est vide 
    { }// comportement par défault de submit => renvoit la réponse type à required non valid ...}
  else if ( !(firstNameRegex.test (firstNameInput.value ) && lastNameRegex.test (lastNameInput.value ) && addressRegex.test(addressInput.value )  && cityRegex.test (cityInput.value )  )){ // si un des champs est non valides
      event.preventDefault();
      }
      else { // champ correct
        event.preventDefault();
        let arrayProductOrderId = arrayProductOrder();
        let contact = new Contact (arrayProductOrderId);
        requestAndGoToConfirmationPage(contact);
      } 
})


















































/**
 * différentes méthodes pour validations de formulaire
 * 
 * 
 *   fetch(`http://localhost:3000/api/products/${_id}`) // on recoit du serveur une promise que l'on traite
      .then(data => data.json()) // transformation des données en format json
      .then(jsonCanap => { 
          let canapOrder = new CanapOrder(_id);  // création de l'objet Canap
          orderArray.push(canapOrder);
      })
    console.log(orderArray);
    }

 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * lastNameInput.addEventListener("keyup", function (event) { // Chaque fois que l'utilisateur saisie une donnée, on vérifie que le champ du nom est valide. l'attribut patern  est testé et retourne dans l'objet event, validity,un objet validityState qui est un bouléin
  if (lastNameInput.validity.valid) {     // S'il y a un message d'erreur affiché et que le champ est valide, on retire l'erreur
    lastNameError.innerHTML = ""; // On réinitialise le contenu
  }
  else { // les données saisies sont invalides
    if (lastNameInput.value === '') { //  si le chanp est non rempli
        lastNameError.innerHTML = "veuillez rentrez un nom svp!";  // On réainitialise le contenu
    }
    else{
        lastNameError.innerHTML = "veuillez saisir un nom correct svp !";
    } 
  }
})
 * let lastNameRegex = new RegExp("^([a-zA-Z\xC0-\uFFFF]{1,60}[ \-\']{0,1}){1,3}$"); // on définit un objet regex
// gestion de validation de la saisie du prénom, première méthode

let firstNameInput = document.getElementById("firstName"); // on récupère l'élément input du prénom
let firstNameError = document.getElementById("firstNameErrorMsg"); // on récupère l'élément où l'on va inserer le message d'erreur

firstNameInput.addEventListener('keyup', () => {   // Chaque fois que l'utilisateur saisit quelque chose...
  if (firstNameInput.validity.valid) {       //si le test lié à l'attribut pattern est correct
    firstNameError.innerHTML = ""; // On réinitialise le contenu du message d'erreur par un élément "vide"
  }
    firstNameInput.checkValidity(); // si la saisie est incorect on appèle la méthode checkvalidity qui renvoie 'invalid'
});
 
firstNameInput.addEventListener('invalid', () => { // si la saisie est non valide, on récupère la valeur de checkvalidity
    if (firstNameInput.value === '') { // si le chanp est vide
      firstNameError.innerText = "Veuillez rentrer votre prénom svp "; // On réinitialise le contenu du message d'erreur
    } else { // champ non valide et non vide
        firstNameError.innerText = "veuillez rentrer un prénom valable svp!"; // On réinitialise le contenu du message d'erreur
    }
});
 * 
 * 
 */
