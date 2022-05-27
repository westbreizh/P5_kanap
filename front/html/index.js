//Gestion de l'affichage des canapés sur la page d'accueil


/**
 * fonction asynchrone  fetch qui renvoit un objet promise ??
 * @param {url} adresse du serveur où l'on va chercher les informations.
 * Le chainage des différentes promise va aboutir à créer différents éléments avec différents
 * attributs qui vont être injecté dans le dom pour construire la page html et afficher les canapés
 */

fetch("http://localhost:3000/api/products")
    .then( data => data.json())  // transforme les données brut du serveur en une liste de données en format json
    .then( jsonListCanap => {   
       
        for(let jsonCanap of jsonListCanap){
            let canap = new Canap (jsonCanap);       // construction d'un objet canap pour chacun des éléments de la liste

            let link = document.createElement("a");     //  création d'un élément, d'un objet document
            link.setAttribute("href", `./product.html?id=${canap._id}`); // affectation d'un attribut href on fait passer dans l'url la valeur de la variable idée qui sera choisi et que l'on pourra récupérer...
            document.getElementById("items").appendChild(link);  // insertion de l'élément dans le dom
                
            let article = document.createElement("article");
            link.appendChild(article);

            let image = document.createElement("img");
            image.setAttribute("src", `${canap.imageUrl}`); 
            image.setAttribute("alt", `${canap.altTxt}`); 
            article.appendChild(image);

            let h3 = document.createElement("h3");
            h3.setAttribute("class", "productName"); 
            h3.innerText = `${canap.name}`; 
            article.appendChild(h3);

            let p = document.createElement("p");
            p.setAttribute("class", "productDescription"); 
            p.innerText = `${canap.description}`; 
            article.appendChild(p);

        };
    });


    