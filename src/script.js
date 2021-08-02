

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

function formatDay(timestamp){

let date = new Date(timestamp*1000);
let day = date.getDay();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];

}

let nowElement = document.querySelector("#update-time"); 
let currentTime=new Date();
nowElement.innerHTML=formatDate(currentTime);


let h = currentTime.getHours();
console.log(h);
if (h>=8 && h<10){
     document.body.style.backgroundColor= "linear-gradient(to right, #633cab 0%, #FAE55E 100%";
} else if ( h>=10 && h < 14) { 
document.body.style.background="linear-gradient(to right, #633cab 0%, #F39429 100%)";
} else if ( h>=14 && h<18) { 
document.body.style.background="linear-gradient(to right, #633cab 0%, #FAE55E 100%)";
} else if (h>=18 && h<22){
     document.body.style.background= "linear-gradient(to right, #633cab 0%, #8290FB 100%)";
} else if ( h >=22){ 
    document.body.style.background="linear-gradient(to right, #633cab 0%, #060A4E 100%)";
} else if ( h == 00 && h < 04)
{document.body.style.background="linear-gradient(to right, #633cab 0%, #060A4E 100%)";
} else if ( h>=04 && h <08) { 
document.body.style.background="linear-gradient(to right, #633cab 0%, #B3F3F8 100%)";
}



function getMoonPhase(moonPhase){
    if (moonPhase === 0 || moonPhase === 1) {
    return "New Moon 🌑";
  } else if (0 < moonPhase< 0.25) {
    return "Waxing Crescent Moon 🌒";
  } else if (moonPhase === 0.25) {
    return "First Quarter Moon🌓";
  } else if (0.25 < moonPhase < 0.5) {
    return "Waxing Gibous Moon🌔";
  } else if (moonPhase === 0.5) {
    return "Full Moon 🌕";
  } else if (0.5 < moonPhase < 0.75) {
    return "Waning Gibous Moon🌖";
  } else if (moonPhase === 0.75) {
    return "Last Quarter Moon🌗";
  } else {
    return "Waning Crescent Moon🌘";
  }
}




function handleSubmit(event){
    event.preventDefault();
    let city = document.querySelector("#search-text-input").value;
    searchCity(city);
}


let form= document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


function searchCity(city){
let apiKey = "dd50664a96525c62168f272505305124";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeatherCondition);
}


function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "dd50664a96525c62168f272505305124";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}


function displayWeatherCondition(response){

    let country = response.data.sys.country;
    let city = response.data.name;
    let cityDisplay = document.querySelector("#city");

cityDisplay.innerHTML = `${city}, ${country}`;

celsiusTemperature = response.data.main.temp;

document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.weather[0].description;


let iconElement = document.querySelector("#weather-icon");
iconElement.setAttribute("src",  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

getForecast(response.data.coord);

}


function searchLocation(position){
let apiKey = "dd50664a96525c62168f272505305124";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeatherCondition);
}


function getCurrentLocation(event){
    event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayForecast(response){

    let forecast = response.data.daily;
    console.log(response.data.daily);

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML='<div class="row">';
    
    forecast.forEach(function (forecastDay, index) {
    forecastHTML = forecastHTML + ` 
    <div class="col-3">
                    <div class="opacity-forecast">
                        <div class="weather-forecast-date">
                            ${formatDay(forecastDay.dt)}
                         </div>
                           

                        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="30" />
                        <div class="weather-forecast-temp">
                            <span class="weather-forecast-min-temp">
                            ${Math.round(forecastDay.temp.min)}    
                            </span> -
                            <span class="weather-forecast-max-temp">
                            ${Math.round(forecastDay.temp.max)}
                            </span>
                            °C
                        </div>

                    </div>
     </div>               
`;
    });
    

forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML= forecastHTML;


let moonPhase= response.data.daily[0].moon_phase;
   document.querySelector("#moon-phase").innerHTML = `${getMoonPhase(moonPhase)}`;
   console.log(moonPhase);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("São Paulo");
