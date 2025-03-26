document.querySelector("#openBtn").addEventListener("click", function (){
    console.log("open button clicked")
    document.querySelector("#mySidenav").classList.add("open");
});
document.querySelector("#closeBtn").addEventListener("click", function (){
    console.log("close button clicked")
    document.querySelector("#mySidenav").classList.remove("open");
});

let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
const favorisList = document.querySelector("#favoris-list");
const template = document.querySelector("#template");

function afficherFavoris(){
    favorisList.innerHTML = "";
    
    if(favoris.length === 0){
        favorisList.innerHTML = "<p>Aucune recette en favoris.</p>";
        return;
    }
    for(let fav of favoris){
        let clone = template.content.cloneNode(true);

        clone.querySelector(".favori-img").src = fav.image;
        clone.querySelector(".favori-img").alt = fav.nom;
        clone.querySelector(".favori-titre").textContent = fav.nom;
        clone.querySelector(".favori-categorie").textContent = fav.categorie;
        clone.querySelector(".favori-temps").textContent = fav.temps;
        clone.querySelector(".favori-difficulte").textContent = fav.difficulte;
        clone.querySelector(".button").href = fav.lien;
        
        let removeBtn = clone.querySelector(".remove-fav");
        removeBtn.addEventListener("click", function(){
            supprimerFavori(fav.nom);
        });
        favorisList.appendChild(clone);
    }
}
function supprimerFavori(nomRecette){
    favoris = favoris.filter(fav => fav.nom !== nomRecette);
    localStorage.setItem("favoris", JSON.stringify(favoris));
    
    let articles = document.querySelectorAll(".favori");
    for(let article of articles){
        let titre = article.querySelector(".favori-titre");
        if(titre.textContent === nomRecette){
            article.remove();
            break;
        }
    }
    afficherFavoris()
}
afficherFavoris();