//Gestion de l'affichage des kanapés sur la page d'accueil


/**
 * fonction asynchrone  fetch qui renvoit un objet promise dont la réponse sera traité par d'autre promise
 * @param {url} adresse du serveur où l'on va chercher les informations.
 * Le chainage des différentes promise va aboutir à créer différents éléments avec différents
 * attributs qui vont être injecté dans le dom pour construire la page html et afficher les kanapés
 */

fetch("http://localhost:3000/api/products") // on récupère les données brutes via l'appi fetch sur le serveur
    .then( data => data.json())  // transforme les données brut du serveur en une liste de données en format json
    .then( jsonListkanap => {   // a partir des données récuprés on construit la page
       
        for(let jsonkanap of jsonListkanap){    // pour chaque élément de la liste
            let kanap = new Kanap (jsonkanap);  // construction d'un objet kanap pour chacun des éléments de la liste

            let link = document.createElement("a");     //  création d'un htmlélément 
            link.setAttribute("href", `./product.html?id=${kanap._id}`); // affectation d'un attribut href on fait passer dans l'url comme paramètre la valeur de la variable id que l'on pourra récupérer pour la construction de la page product.html
            let section = document.getElementById("items"); // on récupère dans le dom le noeud corespondant à la balise section du html où on va injecter notre objet crée
            section.appendChild(link);  // insertion de l'élément dans le dom
                
            let article = document.createElement("article");
            link.appendChild(article);

            let image = document.createElement("img");
            image.setAttribute("src", `${kanap.imageUrl}`); 
            image.setAttribute("alt", `${kanap.altTxt}`); 
            article.appendChild(image);

            let h3 = document.createElement("h3");
            h3.setAttribute("class", "productName"); 
            h3.innerText = `${kanap.name}`; 
            article.appendChild(h3);

            let p = document.createElement("p");
            p.setAttribute("class", "productDescription"); 
            p.innerText = `${kanap.description}`; 
            article.appendChild(p);

        };
    })
    .catch(error => {
        alert("une erreur est survenue! Veuillez nous en excuser !");
        console.log(error);
     });



    