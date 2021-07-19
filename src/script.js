

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

document.querySelector("#city").innerHTML = response.data.name;

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

function displayFahrenheitTemperature(event){
    event.preventDefault;
    let temperatureElement = document.querySelector("#temp");
    let fahrenheitTemperature = ((celsiusTemperature*9)/5) +32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature(event){
    event.preventDefault;
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    console.log(celsiusTemperature);
}


function displayForecast(response){

    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");
  
    let days = ["Tue", "Wed", "Thu", "Fri"];

    let forecastHTML='<div class="row">';
    
    days.forEach(function (day) {
    forecastHTML = forecastHTML + ` 
    <div class="col-3">
                        <div class="weather-forecast-date">
                            ${day}
                        </div>
                        <img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" alt="" width="30" />
                        <div class="weather-forecast-temp">
                            <span class="weather-forecast-min-temp">
                                11
                            </span> -
                            <span class="weather-forecast-max-temp">
                                19
                            </span>
                            °C
                        </div>
     </div>               
`;
    });
    

forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML= forecastHTML;

}


let celsiusTemperature = null;


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("São Paulo");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature)


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


