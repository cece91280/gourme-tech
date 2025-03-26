const details = document.querySelectorAll("details");

for(const detail of details){
    detail.addEventListener("click", function (){
        for (const otherDetail of details){
            if(otherDetail !== detail){
                otherDetail.removeAttribute("open");
            }
        }
    });
}
document.querySelector("#openBtn").addEventListener("click", function (){
    console.log("open button clicked")
    document.querySelector("#mySidenav").classList.add("open");
});
document.querySelector("#closeBtn").addEventListener("click", function (){
    console.log("close button clicked")
    document.querySelector("#mySidenav").classList.remove("open");
});