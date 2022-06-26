// gestion de l'affichage du canapé choisi cliqué dans la page accueil.
 

let strg = window.location.href; // retourne l'adresse url de la page courante en un objet de type string
let url = new URL(strg);  // on transforme la variable str de type string en objet de type url
let id = url.searchParams.get("id"); // on récupère la valeure du paramètre id contenu dans l'adresse url


/**
 *  l'api fetch retourne une promise dont le résultat (les données brute du serveur) sont traitées par d'autre promises
 * @param {url avec variable id } adresse du serveur où l'on va chercher les informations avec la valeur de l'id du kanapé choisi.
 */

fetch(` http://localhost:3000/api/products/${id} `) // on récupère les données brutes via l'appi fetch sur le serveur
    .then(data => data.json()) // la fonction de la promise transforme les données brutes au format json
    .then(jsonkanap => { // ensemble de code de la promise destiné à construire, afficher les données dans la page

        let kanap = new Kanap(jsonkanap); // fabrication de l'objet de la classe kanap.

        let imageContenair = document.querySelector(".item__img");  // on recupère le noeud, l'élément dans le dom correspondant à la balise div ayant pour attribut item_img
        let image = document.createElement("img"); // création d'un élément image dans le dom qui sera traduit comme une balise img html
        image.setAttribute("src", `${kanap.imageUrl}`); // ajout d'attribut et sa valeur à l'élément
        image.setAttribute("alt", `${kanap.altTxt}`); // ajout d'attribut et sa valeur à l'élément
        imageContenair.appendChild(image); // insertion de l'élément image dans le dom au niveau du noeud imagecontenair 

        document.querySelector("title").innerText = `${kanap.name}`; // on récupère l'élément voulu et on insère du contenu de type string
        document.getElementById("title").innerText = `${kanap.name}`; // on récupère l'élément voulu et on insère du contenu de type string
        document.getElementById("price").innerText = `${kanap.price}`;
        document.getElementById("description").innerText = `${kanap.description}`;

        for (let color of kanap.colors) {           // on boucle sur les différents élément du tableau, pour chaque couleur on crée un element option
            let select = document.querySelector("select");  // on récupère le noeud de l'objet select dans le dom
            let option = document.createElement("option");  // on crée l'élément option
            option.setAttribute("value", `${color}`); // ajout d'attribut et de sa valeur (value sera la valeure de la couleur choisie par le client)
            option.innerText = `${color}`; // ajout du nom de la couleur dans la future balise option
            select.appendChild(option); // on insert l'élément option dans le dom
        };
    })
    .catch(error => {
        console.log(error);
        alert("une erreur est survenue! Veuillez nous en excuser ! Vous allez être redigiré vers la page d'accueil!");
        location.assign("index.html");

     });


/** 
 fonction de récupération de la quantité de kanapé saisi par le client
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
 * fonction ajoutant le(s) Kanapé(s) selectionné(s) dans un tableau stocké dans le local storage
 */

function pushArrayInLocalStorage() {

let colorChoice = getColorChoice(); // on récupère la couleur et la quantité selectionné pour construire un objet de la classe canapLS plus bas
let quantityChoice = getQuantityChoice();

if (localStorage.getItem("arrayKey") === null) {  //si le localstarge est vide 
    let kanapLS = new KanapLS(id,colorChoice, quantityChoice); // on cré l'objet qui ira dans le localstorage
    let array = [];  // on déclare et  initialise un tableau vide
    array.push(kanapLS); // on injecte l'objet dans le tableau
    jsonArray = JSON.stringify(array); // on transforme l'objet js en Json
    localStorage.setItem("arrayKey", jsonArray); // On ajoute le tableau au localStorage en lui attachant une clef 
}
else {  // si local storage contient déjà un tableau
    let jsonArray = localStorage.getItem("arrayKey"); // on récupère le tableau
    let array = JSON.parse(jsonArray); // transforme le tableau en objet js
    let kanapLS = new KanapLS(id,colorChoice, quantityChoice); // on cré l'objet KanapLS qui va être comparé aux autres objet kanapLS du tableau du localstorage
    var addNewkanapLS = "on" ; // variable permettant d'entrer ou non dans l'instruction d'ajout du Kanapé si il n'était pas déjà présent dans le localStorage
    for (let kanapKart of array) { // pour chaque kanapé du tableau kanapKart du local storage
        if (kanapKart._id == kanapLS._id && kanapKart.color == kanapLS.color) { // si le canapé choisi est déjà présent dans le tableau du localStorage
            kanapKart.quantity += kanapLS.quantity; // alors on additionne les deux quantité
            jsonArray = JSON.stringify(array); // on transforme l'objet js en Json
            localStorage.setItem("arrayKey", jsonArray); // on réanitialise les données dans le localStorage
            addNewkanapLS = "off"; // on affecte la valeur off pour ne pas rentrer dans l'instruction d'ajout du kanapé dans le code ci-dessous
            break; // on arrete la boucle for ?? on pourrait pas sauter l'instruction ci-dessous faire break plus important ??????
        }
    }
    if (addNewkanapLS === "on") { // si le kanapé choisi n'était pas déjà présent dans le localStorage
        array.push(kanapLS); // on ajoute le kanapé au tableau
        jsonArray = JSON.stringify(array); // on transforme l'objet js en Json
        localStorage.setItem("arrayKey", jsonArray); // on réanitialise le taleau du localStorage
    }
}
}


let button = document.getElementById("addToCart"); // on récupère dans le dom l'élement button

button.addEventListener("click", () => {  // on attache à l'élément boutton un gestionnaire d'évenement, qui au click de celui-ci lance la fonction qui ajoute le(s) kanap séléctionné(s)
    let colorChoice = getColorChoice();
    if (colorChoice == ""){
        alert("Veuillez choisir une couleur svp !");
    }
    else {
    pushArrayInLocalStorage();
    alert("canapé(s) ajouté au panier avec succes!");
    }
});
