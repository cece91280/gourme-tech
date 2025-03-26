

document.querySelector("#openBtn").addEventListener("click", function (){
    console.log("open button clicked")
    document.querySelector("#mySidenav").classList.add("open");
});
document.querySelector("#closeBtn").addEventListener("click", function (){
    console.log("close button clicked")
    document.querySelector("#mySidenav").classList.remove("open");
});


// controle des favoris pour le local storage et rafraichisement de la page
let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

function toggleLike(button){
    button.classList.toggle("liked");
    
    let article = button.closest("article");
    let recette = {
        nom: article.querySelector("h2").innerText,
        image: article.querySelector("img").src,
        categorie: article.querySelector(".jaune").innerText,
        temps: article.querySelector(".vert").innerText,
        difficulte: article.querySelector(".bleu").innerText,
        lien: article.querySelector(".button").href
    };
    let index = favoris.findIndex(fav => fav.nom === recette.nom);
    if(index === -1){
        favoris.push(recette);
    }else{
        favoris.splice(index, 1);
    }
    localStorage.setItem("favoris", JSON.stringify(favoris));
}
let boutons = document.querySelectorAll(".like-button");

for(let bouton of boutons){
    let article = bouton.closest("article");
    let recetteNom = article.querySelector("h2").innerText;
    
    if (favoris.some(fav => fav.nom === recetteNom)){
        bouton.classList.add("liked");
    }
    
}