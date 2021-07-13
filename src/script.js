

function formatDate(now){
    
    let hours = now.getHours();
    if (hours<10){
        hours=`0${hours}`;
    }
let minutes = now.getMinutes();
      if (minutes<10){
        minutes=`0${minutes}`;
    }


let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];


return `${day}, ${hours}:${minutes}`
}

let nowElement = document.querySelector("h1"); 
let currentTime=new Date();
nowElement.innerHTML=formatDate(currentTime);

function search(event){
    event.preventDefault();
    let searchInput= document.querySelector("#search-text-input");
    let h2 =document.querySelector("h2");
    h2.innerHTML = `Search for ${searchInput.value}..`;
}

let form= document.querySelector("#search-form");
form.addEventListener("submit", search);