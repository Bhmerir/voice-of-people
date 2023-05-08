const dashboard = document.querySelector("#dashboard");
const postCard = document.querySelector(".custom-card");
const login = dashboard.getAttribute("data-login");

dashboard.addEventListener("click", ()=>{
    if(!login){
        alert("You have to login first!")
    }
});

postCard.addEventListener("click", ()=>{
    if(!login){
        alert("You have to login first!")
    }
});