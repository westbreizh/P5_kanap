// gestion de l'affichage de la page confirmation
 

//localStorage.removeItem("arrayKey"); // suppression du tableau des canap dans le local storage
let strg = window.location.href; // retourne l'adresse url de la page courante en un objet de type string
let url = new URL(strg);  // on transforme la variable str de type string en objet de type url
let id = url.searchParams.get("id"); // on récupère la valeure du paramètre id contenu dans l'adresse url


let orderIdNoddle = document.getElementById("orderId");
orderIdNoddle.innerText =`${id}`;




















