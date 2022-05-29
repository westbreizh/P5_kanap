
// gestion de l'affichage des canapés dans le panier

let jsonArray = localStorage.getItem("arrayKey");  // on récupère le tableau des canapés du localStorage
let array = JSON.parse(jsonArray);  // on transforme Json en js


for (let canapKart of array) { // pour chaque élément du tableau

    let _id = canapKart._id; 

    fetch(`http://localhost:3000/api/products/${_id}`) // on recoit du serveur une promise que l'on traite
        .then(data => data.json()) // transformation des données en format json
        .then(jsonCanap => { 
            let canap = new Canap(jsonCanap);  // création de l'objet Canap

            let article = document.createElement("article"); // création de l'élement article
            article.classList.add("cart__item"); // on lui affecte l'attribut class cart_item
            article.setAttribute("data-id", `${_id}`); //ajout d'attribut data-id
            article.setAttribute("data-color", `${canapKart.color}`); //ajout d'attribut data-color
            document.getElementById("cart__items").appendChild(article); // on injecte dans le dom le htmlElement article

            let imgContenair = document.createElement("div");
            imgContenair.classList.add("cart__item__img");
            article.appendChild(imgContenair);

            let image = document.createElement("img");
            image.setAttribute("src", `${canap.imageUrl}`);
            image.setAttribute("alt", `${canap.altTxt}`);
            imgContenair.appendChild(image);

            let cartItemContent = document.createElement("div");
            cartItemContent.classList.add("cart__item__content");
            article.appendChild(cartItemContent);

            let cartItemContentDescription = document.createElement("div");
            cartItemContent.classList.add("cart__item__content__description");
            cartItemContent.appendChild(cartItemContentDescription);

            let h2 = document.createElement("h2");
            h2.innerText = `${canap.name}`;
            cartItemContentDescription.appendChild(h2);

            let p1 = document.createElement("p");
            p1.innerText = `${canapKart.color}`;
            cartItemContentDescription.appendChild(p1);

            let p2 = document.createElement("p");
            p2.innerText = `${canap.price} €`;
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
            input.setAttribute("value", `${canapKart.quantity}`);
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


// gestion de validation de la saisie du prénom, première méthode

let firstNameInput = document.getElementById("firstName"); // on récupère l'élément input du prénom
let firstNameError = document.getElementById("firstNameErrorMsg"); // on récupère l'élément où l'on va inserer le message d'erreur

firstNameInput.addEventListener('keyup', () => {   // Chaque fois que l'utilisateur saisit quelque chose, on vérifie la validité du champ du prénom.
  if (firstNameInput.validity.valid) {       // S'il y a un message d'erreur affiché et que le champ est valide, on retire l'erreur, pError = document.getElementById("firstNameErrorMsg"); on récupère l'élément où on inserer le message d'erreur
    firstNameError.innerHTML = ""; // On réinitialise le contenu du message d'erreur
  }
    firstNameInput.checkValidity(); // le test de validité relié à l'attribut patern retourne invalid si test n'est pas bon
});
 
firstNameInput.addEventListener('invalid', () => { // si la saisie est non valide 
    if (firstNameInput.value === '') { // si le chanp est vide
      firstNameError.innerText = "Veuillez rentrer votre prénom svp "; // On réinitialise le contenu du message d'erreur
    } else { // champ non valide et non vide
        firstNameError.innerText = "veuillez rentrer un prénom valable svp!"; // On réinitialise le contenu du message d'erreur
    }
});


// gestion de validation de la saisie du nom, deuxième méthode

let lastNameInput = document.getElementById("lastName"); // on récupère l'élément input du nom
let lastNameError = document.getElementById("lastNameErrorMsg"); // on récupère l'élément où l'on va inserer le message d'erreur

lastNameInput.addEventListener("keyup", function (event) { // Chaque fois que l'utilisateur saisie une donnée, on vérifie que le champ du nom est valide. l'attribut patern  est testé et retourne dans l'objet event, validity,un objet validityState qui est un bouléin
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


// gestion de validation de la saisie de l'adresse, 3ème méthode

let addressInput= document.getElementById("address"); // on récupère l'élément input de l'adresse
let addressError = document.getElementById("addressErrorMsg"); // on récupère l'élément où l'on va inserer le message d'erreur
let addressRegex = new RegExp("a"); // on définit un objet regex
let addressNoSubmit = true;  // une variable pour autotiser ou non l'envoie des données dans l'input submit

addressInput.addEventListener("keyup", () => { // Chaque fois que l'utilisateur saisie une donnée ...
  if ( addressRegex.test (addressInput.value )){ //  si la valeur saisie est correcte
    addressError.innerHTML = ""; // On réinitialise le contenu
    addressNoSubmit = false; // on autorise l'envoie des données
    return addressNoSubmit;
  }
  else{
    if (addressInput.value === '') { //  si le chanp est non rempli
      addressError.innerHTML = "tu vas me filer une adresse enf**!!"; // On réinitialise le contenu
    }
    else{  //  si le chanp est invalide
      addressError.innerHTML = "tu vas me filer une adresse correct enf**!!"; // On réinitialise le contenu
    }
    addressNoSubmit = true; // on empêche l'envoie des données
    return addressNoSubmit;
  }
});


// gestion de validation de la saisie de la ville

let cityInput = document.getElementById("city");
let cityError = document.getElementById("cityErrorMsg");

cityInput.addEventListener("keyup", function (event) { // Chaque fois que l'utilisateur saisie une donnée, on vérifie que le champ du nom est valide. l'attribut patern  est testé et retourne dans l'objet event, validity,un objet validityState qui est un bouléin
  if (cityInput.validity.valid) {     // S'il y a un message d'erreur affiché et que le champ est valide, on retire l'erreur
    cityError.innerHTML = ""; // On réinitialise le contenu
  }
  else { // les données saisies sont invalides
    if (cityInput.value === '') { //  si le chanp est non rempli
        cityError.innerHTML = "veuillez rentrez votre ville ou patelin svp!";  // On réainitialise le contenu
    }
    else{
        cityError.innerHTML = "veuillez saisir un nom de patelin ou de ville correct svp !"; // On réainitialise le contenu
    } 
  }
})


// gestion de validation de la saisie de l'email

let emailInput = document.getElementById("email");
let emailError = document.getElementById("emailErrorMsg");

emailInput.addEventListener("keyup", function (event) { // Chaque fois que l'utilisateur saisie une donnée, on vérifie que le champ du nom est valide. l'attribut patern  est testé et retourne dans l'objet event, validity,un objet validityState qui est un bouléin
  if (emailInput.validity.valid) {     // S'il y a un message d'erreur affiché et que le champ est valide, on retire l'erreur
    emailError.innerHTML = ""; // On réinitialise le contenu
  }
  else { // les données saisies sont invalides
    if (emailInput.value === '') { //  si le chanp est non rempli
      emailError.innerHTML = "tu vas me filer un mail enf**!!!";  // On réainitialise le contenu
    }
    else{
      emailError.innerHTML = "tu vas me filer un mail correct enf**!! !"; // On réainitialise le contenu
    } 
  }
})


// gestion de la transmission ou non des données au serveur

let commanderButton = document.getElementById('order');


commanderButton.addEventListener("click", function (event) {   // Chaque fois que l'utilisateur tente d'envoyer les données, on vérifie que les différents champs soient valide
  if (!firstNameInput.validity.valid || !lastNameInput.validity.valid || addressNoSubmit || !cityInput.validity.valid || !emailInput.validity.valid) {
    console.log("hello");
  }
  else {
    event.preventDefault();
    console.log("hello2");
    location.assign("./confirmation.html")
    console.log("hello3");
  }
  }
);





/**
 * Création d'une classe contact ,contenant les données renseignés par l'utilisateur et un tableau de produit
 */

 class Contact {
  constructor(userInput, array) {
      this.userInput = userInput;
      this.arrayCanapOrder = array;
  }
}

/**
 * Création d'un tableau
 */
