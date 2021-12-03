
var weatherFormEl = document.querySelector("#weather-form");
var currentCityEl = document.querySelector("#current-ciyt");
var futureWeatherEl = document.querySelector("#future-weather");
var cityInputEl = document.querySelector("#city");

var getCityWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=2ea8fea258bbf4c7d30e6cc6067e3356";
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            });
        
    });
}

var formWeather = function (event) {
    event.preventDefault();
    var currentCity = cityInputEl.value.trim();
    console.log(currentCity);
}



// var getWeather = function(event) {
//     event.preventDefault();

// }

// var cityLocation = function(position) {
//     var latitude = navigator.geolocation.position.coords.latitude;
//     var longitude = navigator.geolocation.position.coords.longitude;
//     console.log(latitude);
//     console.log(longitude);
// }

// cityLocation();
getCityWeather();











weatherFormEl.addEventListener("submit", formWeather);