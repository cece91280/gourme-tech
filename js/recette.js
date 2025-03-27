// bouton burger//
document.querySelector("#openBtn").addEventListener("click", function (){
    console.log("open button clicked")
    document.querySelector("#mySidenav").classList.add("open");
});
document.querySelector("#closeBtn").addEventListener("click", function (){
    console.log("close button clicked")
    document.querySelector("#mySidenav").classList.remove("open");
});
// récupération du local storage et fonction like //
let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

// Fonction pour liker/déliker une recette
function toggleLike(button) {
    button.classList.toggle("liked");

    let recetteContainer = document.querySelector(".recette-header");
    let recette = {
        nom: recetteContainer.querySelector("h2").innerText,
        image: recetteContainer.querySelector("img").src,
        categorie: recetteContainer.querySelector(".jaune").innerText,
        temps: recetteContainer.querySelector(".vert").innerText,
        difficulte: recetteContainer.querySelector(".bleu").innerText,
        lien: window.location.href
    };

    let index = favoris.findIndex(fav => fav.nom === recette.nom);
    if (index === -1) {
        favoris.push(recette);
    } else {
        favoris.splice(index, 1);
    }
    localStorage.setItem("favoris", JSON.stringify(favoris));
}
let recetteContainer = document.querySelector(".recette-header");
let recetteNom = recetteContainer.querySelector("h2").innerText;
let likeButton = document.querySelector(".like-button");

// Vérifie si la recette est déjà en favoris
if (favoris.some(fav => fav.nom === recetteNom)) {
    likeButton.classList.add("liked");
}

// Ajoute l'événement au bouton like
likeButton.addEventListener("click", function() {
    toggleLike(this);
});
// theme //
// controle du theme //
const themeSvg = document.querySelector(`svg[data-id="theme"]`);


function applyTheme(theme){
    if(theme === "dark"){
        document.documentElement.classList.add("dark-theme");
        themeSvg.setAttribute("fill","white");
    }else{
        document.documentElement.classList.remove("dark-theme");
        themeSvg.setAttribute("fill","yellow");
    }
}
function toggleTheme(){
    const currentTheme = document.documentElement.classList.contains("dark-theme") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
}

const savedTheme = localStorage.getItem("theme");
if(savedTheme){
    applyTheme(savedTheme);
}else{
    applyTheme("light");
}

if(themeSvg){
    themeSvg.style.cursor = "pointer";
    themeSvg.addEventListener("click", toggleTheme);
}

