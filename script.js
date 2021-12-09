
var weatherFormEl = document.querySelector("#weather-form");
var currentCityEl = document.querySelector("#current-city");
var futureWeatherEl = document.querySelector("#future-weather");
var cityInputEl = document.querySelector("#city");
var pastCityButtonEl = document.getElementById("past-search");
var latitude = 29.4241;
var longitude = 98.4936;

var getCoordinates = function(city) {
    var apiUrlCoordinates = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ea8fea258bbf4c7d30e6cc6067e3356`
    //var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latit+ "&lon=" + longitude + "&appid=2ea8fea258bbf4c7d30e6cc6067e3356";
    fetch(apiUrlCoordinates)
        .then(function(response) {
            return response.json()
        }).then(function(data){
            console.log(data.coord)
            getWeather(data.coord)
        }).catch(function(err){
            console.log(err);

        });       
    };

var getWeather = function(coordinates) {
    var {lat} = coordinates;
    var {lon} = coordinates;
    var city = coordinates.name;
    console.log(lat);
    console.log(lon);
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=2ea8fea258bbf4c7d30e6cc6067e3356`
    fetch(apiUrl)
    .then(function(response) {
        return response.json()
    }).then(function(data){
        console.log(data)
        renderWeather(city, data);
    }).catch(function(err){
        console.log(err);

    });       
}
 var renderWeather = function(city, data){
     renderCurrentForecast(city, data.current, data.timezone);
     renderFiveDayForecast(data.daily, data.timezone);

 }

 var renderCurrentForecast = function(city, weather, timezone) {
     var card = document.createElement("div");
     var cardContainer = document.createElement("div");
     var cardHeader = document.createElement("h2");
     var cardIcon = document.createElement("img");
     var cardTemp = document.createElement("p");
     var cardWind = document.createElement("p");
     var cardHumidity = document.createElement("p");
     var cardUV = document.createElement("p");
     var uvButton = document.createElement("button");
     uvButton.classList.add("btn", "btn-sm");
     card.setAttribute("class", "card");
     cardContainer.setAttribute("class", "card-body");
     card.append(cardContainer);
     cardHeader.setAttribute("class", "card-title");
     cardIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`)
     cardIcon.setAttribute("class", "weather-img");
     cardTemp.setAttribute("class", "card-text");
     cardWind.setAttribute("class", "card-text");
     cardHumidity.setAttribute("class", "card-text");
     cardHeader.textContent = `${city}`;
     cardHeader.append(cardIcon);
     cardTemp.textContent = `Temperature: ${weather.temp} °F`
     cardWind.textContent = `Wind: ${weather.wind_speed} mph`
     cardHumidity.textContent = `Humidity: ${weather.humidity}`
     cardUV.textContent = `UV Index: `
     if (weather.uvi < 3) {
         uvButton.classList.add("btn-success")
     } else if (weather.uvi < 7) {
         uvButton.classList.add("btn-warning")
     } else {
         uvButton.classList.add("btn-danger")
     }
     uvButton.textContent = weather.uvi
     cardContainer.append(cardHeader, cardTemp, cardWind, cardHumidity);
     cardUV.append(uvButton);
     cardContainer.append(cardUV);
     currentCityEl.innerHTML = "";
     currentCityEl.append(card);
     


 }

 var renderFiveDayForecast = function(weather, timezone) {

 }

// var formWeather = function (event) {
//     //event.preventDefault();
//     var currentCity = cityInputEl.value.trim();
//     //console.log(currentCity);
//     var pastCityEl = document.createElement("button");
//     pastCityEl.setAttribute("type", "submit");
//     pastCityEl.setAttribute("class", "col-12 bg-primary text-light");
//     // pastCityEl.setAttribute("value", currentCity);
//     pastCityEl.textContent(currentCity);
//     pastCityButtonEl.appendChild(pastCityEl);
//         //console.log(currentCity);
    

//     //pastCityButton.appendChild(pastCityEl);
// }

var submitWeather = function (event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    getCoordinates(cityName);


}

// var pastCities = function () {
//     var pastCityEl = document.createElement("button");
//     pastCityEl.setAttribute("type", "submit");
//     pastCityEl.setAttribute("class", "col-12 bg-primary text-light");
//     pastCityEl.setAttribute("value", currentCity);
//     pastCityEl.textContent = currentCity;
    

//     pastCityButton.appendChild(pastCityEl);
    

// }

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




//getCityWeather();


//formWeather();
//pastCities();







weatherFormEl.addEventListener("submit", submitWeather);