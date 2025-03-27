

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
// filtre et recherche //
let inputRecherche = document.querySelector(".recherche input");
let checkboxes = document.querySelectorAll("fieldset input[type='checkbox']");
let articles = document.querySelectorAll(".recette article");

function filtrerRecettes() {
    let terme = inputRecherche.value.toLowerCase();

    for (let i = 0; i < articles.length; i++) {
        let article = articles[i];
        let nom = article.querySelector("h2").innerText.toLowerCase();
        
        
        
        let categorie = article.querySelector(".jaune").innerText.toLowerCase();
        let difficulte = article.querySelector(".bleu").innerText.toLowerCase();

        let tempsTexte = article.querySelector(".vert").innerText;
        let temps = parseInt(tempsTexte.match(/\d+/), 10) || 0; // Extraction du nombre
        

        let filtreCategorie = false;
        let filtreTemps = false;
        let filtreDifficulte = false;

        for (let j = 0; j < checkboxes.length; j++) {
            let checkbox = checkboxes[j];
            if (checkbox.checked) {
                let valeur = checkbox.parentElement.innerText.toLowerCase();

                if (["entrée", "plat", "dessert"].includes(valeur) && categorie === valeur) {
                    filtreCategorie = true;
                }

                if (valeur.includes("rapide") && temps < 30) {
                    filtreTemps = true;
                } else if (valeur.includes("moyen") && temps >= 30 && temps <= 60) {
                    filtreTemps = true;
                } else if (valeur.includes("long") && temps > 60) {
                    filtreTemps = true;
                } 

                if (["facile", "moyen", "difficile"].includes(valeur) && difficulte === valeur) {
                    filtreDifficulte = true;
                }
            }
        }

        let auMoinsUnFiltreActif = Array.from(checkboxes).some(c => c.checked);
        console.log("Filtres actifs ?", auMoinsUnFiltreActif);

        let correspondFiltre = !auMoinsUnFiltreActif || (filtreCategorie || filtreTemps || filtreDifficulte);
        let correspondRecherche = nom.includes(terme);
        console.log(`🔍 "${nom}" contient "${terme}" ?`, correspondRecherche);
        article.style.display = (correspondFiltre && correspondRecherche) ? "block" : "none";
    }
}
inputRecherche.addEventListener("input", filtrerRecettes);
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", filtrerRecettes);
}