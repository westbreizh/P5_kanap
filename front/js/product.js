// gestion de l'affichage du canapé  choisi, cliqué dans la page accueil 
 

let strg = window.location.href; // retourne l'adresse url de la page courante en un objet de type string
let url = new URL(strg);  // on transforme la variable str de type string en objet de type url
let id = url.searchParams.get("id"); // on récupère la valeure du paramètre id contenu dans l'adresse url


/**
 *  l'api fetch retourne une promise dont le résultat (les données brute du serveur) sont traitées par d'autre promises
 * @param {url} adresse du serveur où l'on va chercher les informations avec la valeur de l'id du canapé choisi.
 */

fetch(` http://localhost:3000/api/products/${id} `) // on récupère les données brutes via l'appi fetch sur le serveur
    .then(data => data.json()) // la fonction de la promise transforme les données brutes au format json
    .then(jsonCanap => { // ensemble de code de la promise destiné à construire, afficher les données dans la page

        let canap = new Canap(jsonCanap); // fabrication de l'objet de la classe canap.

        let imageContenair = document.querySelector(".item__img");  // on recupère le noeud, l'élément dans le dom correspondant à la balise div ayant pour attribut item_img
        let image = document.createElement("img"); // création d'un élément image dans le dom qui sera traduit comme une balise img html
        image.setAttribute("src", `${canap.imageUrl}`); // ajout d'attribut et sa valeur à l'élément
        image.setAttribute("alt", `${canap.altTxt}`); // ajout d'attribut et sa valeur à l'élément
        imageContenair.appendChild(image); // insertion de l'élément image dans le dom au niveau du noeud imagecontenair 

        document.getElementById("title").innerText = `${canap.name}`; // on récupère l'élément voulu et on insère du contenu de type string
        document.getElementById("price").innerText = `${canap.price}`;
        document.getElementById("description").innerText = `${canap.description}`;

        for (let color of canap.colors) {           // on boucle sur les différents élément du tableau, pour chaque couleur on crée un element option
            let select = document.querySelector("select");  // on récupère le noeud de l'objet select dans le dom
            let option = document.createElement("option");  // on crée l'élément option
            option.setAttribute("value", `${color}`); // ajout d'attribut et de sa valeur (value sera la valeure de la couleur choisie par le client)
            option.innerText = `${color}`; // ajout du nom de la couleur dans la future balise option
            select.appendChild(option); // on insert l'élément option dans le dom
        };
    });


/** 
 fonction de récupération de la quantité de canapé saisi par le client
 *@return retourne un entier, le choix de la quantité
 */
function getQuantityChoice() {
    let quantityChoice = document.getElementById("quantity").value; // on récupère la valeure sous format string
    quantityChoice = parseInt(quantityChoice); // on transforme en type entier
    return quantityChoice; // on retourne la valeur
}


/**
 * fonction de récupération du choix de couleur 
 * @return retourne la couleur choisie
 */
function getColorChoice() {
    let colorChoiceElmt = document.getElementById("colors");
    let colorChoice = colorChoiceElmt.options[colorChoiceElmt.selectedIndex].value;   // on recupère la valeur via l'index du tableau option                                                       /*selectElmt.options correspond au tableau des balises <option> du select, selectElmt.selectedIndex correspond à l'index du tableau options qui est actuellement sélectionné */
    return colorChoice;
}


/**
 * fonction de création de l'objet canapGoingToCart, ayant pour propriétées : l'id produit , sa couleur, et sa quantité 
 * @return un objet canapGoingTocart
 */

function createCanapGoingToCart() {
    let colorChoice = getColorChoice(); // on récupère la couleur via la fonction définit en amont
    let quantityChoice = getQuantityChoice(); // on récupère la quantité via la fonction définit en amont
    let canapGoingToCart = { _id: id, color: colorChoice, quantity: quantityChoice }; // on cré l'objet
    return canapGoingToCart;
}

/**
 * fonction ajoutant le(s) canapé(s) selectionné(s) dans un tableau stocké dans le local storage
 */

function pushArrayInLocalStorage() {
    if (localStorage.getItem("arrayKey") === null) {  //test si le localstarge est vide 
        let canapGoingToCart = createCanapGoingToCart(); // on cré l'objet qui ira dans le localstorage
        let array = [];  // on déclare et  initialise un tableau vide
        array.push(canapGoingToCart); // on injecte l'objet dans le tableau
        jsonArray = JSON.stringify(array); // on transforme l'objet js en Json
        localStorage.setItem("arrayKey", jsonArray); // On ajoute le tableau au localStorage en lui attachant une clef 
    }
    else {  // si local storage contient déjà un ou des canapés ...
        let jsonArray = localStorage.getItem("arrayKey"); // on récupère le tableau
        let array = JSON.parse(jsonArray); // transforme le tableau en objet js
        let canapGoingToCart = createCanapGoingToCart(); // on crée notre objet canapGoingToCart
        var addNewCanapgoingToCart = "on" ; // variable permettant d'entrer ou non dans l'instruction d'ajout du canapé si il n'était pas déjà présent dans le localStorage
        for (let canapKart of array) { // pour chaque canapé du tableau canapKart du local storage
            if (canapKart._id == canapGoingToCart._id && canapKart.color == canapGoingToCart.color) { // verifie si il ne correspond pas au canapGoingTocart
                canapKart.quantity += canapGoingToCart.quantity; // alors on additionne les deux quantité
                jsonArray = JSON.stringify(array); // on transforme l'objet js en Json
                localStorage.setItem("arrayKey", jsonArray); // on réanitialise les données dans le localStorage
                addNewCanapgoingToCart = "off"; // on affecte la valeur off pour ne pas rentrer dans l'instruction d'ajout du canapé dans le code ci-dessous
                break; // on arrete la boucle for
            }
        }
        if (addNewCanapgoingToCart === "on") { // si le canapé choisi n'était pas déjà présent dans le localStorage
            array.push(canapGoingToCart); // on ajoute le canapé au tableau
            jsonArray = JSON.stringify(array); // on transforme l'objet js en Json
            localStorage.setItem("arrayKey", jsonArray); // on réanitialise le taleau du localStorage
        }
    }
}



let button = document.getElementById("addToCart"); // on récupère dans le dom l'élement button
button.addEventListener("click", pushArrayInLocalStorage); // on attache à l'élément boutton un gestionnaire d'évenement, qui au click de celui-ci lance la fonction qui ajoute le(s) canap séléctionné(s)

