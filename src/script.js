let now= new Date();
let h2=document.querySelector("h2");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();

h2.innerHTML = `${day}, ${hours}:${minutes}`;


function search(event){
    event.preventDefault();
    let searchInput= document.querySelector("#search-text-input");
    let h1 =document.querySelector("h1");
    h1.innerHTML = `Search for ${searchInput.value}..`;
}

let form= document.querySelector("#search-form");
form.addEventListener("submit", search);