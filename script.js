
var weatherFormEl = document.querySelector("#weather-form");
var currentCityEl = document.querySelector("#current-city");
var fiveDayForecastEl = document.querySelector("#five-day-forecast");
var futureWeatherOneEl = document.querySelector("#future-weather-one");
var futureWeatherTwoEl = document.querySelector("#future-weather-two");
var futureWeatherThreeEl = document.querySelector("#future-weather-three");
var futureWeatherFourEl = document.querySelector("#future-weather-four");
var futureWeatherFiveEl = document.querySelector("#future-weather-five");
var cityInputEl = document.querySelector("#city");
var pastCityButtonEl = document.getElementById("past-search");

var getCoordinates = function(city) {
    var apiUrlCoordinates = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ea8fea258bbf4c7d30e6cc6067e3356`
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
    renderCurrentForecast(city, data.current);
    renderFiveDayForecastDayOne(data.daily[0]);
    renderFiveDayForecastDayTwo(data.daily[1]);
    renderFiveDayForecastDayThree(data.daily[2]);
    renderFiveDayForecastDayFour(data.daily[3]);
    renderFiveDayForecastDayFive(data.daily[4]);

 }

 var renderCurrentForecast = function(city, weather) {
     var headerTitle = document.createElement("h2");
     headerTitle.classList.add("current-weather-title");
     headerTitle.textContent = "Current Weather";
     var futureTitle = document.createElement("h2");
     futureTitle.classList.add("future-weather-title");
     futureTitle.textContent = "5 Day Forecast";
     var previousCity = document.createElement("button");
     previousCity.setAttribute("type", "submit");
     previousCity.classList.add("bg-info", "text-light", "p-1", "m-2", "col-12")
     previousCity.textContent = cityInputEl.value.trim();
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
     card.classList.add("card", "main-weather");
     card.setAttribute("style", "width: 100rem;");
     cardContainer.classList.add("card-body");
     card.append(cardContainer);
     cardHeader.setAttribute("class", "card-title");
     cardIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`)
     cardIcon.setAttribute("class", "weather-img");
     cardTemp.setAttribute("class", "card-text");
     cardWind.setAttribute("class", "card-text");
     cardHumidity.setAttribute("class", "card-text");
     cardHeader.textContent = cityInputEl.value.trim();
     cardHeader.append(cardIcon);
     var cityTempDecimal = (weather.temp - 273.15) * (9/5) + 32;
     var cityTemp = cityTempDecimal.toFixed(2);
     cardTemp.textContent = `Temperature: ${cityTemp} °F`
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
     currentCityEl.append(headerTitle);
     fiveDayForecastEl.append(futureTitle);
     currentCityEl.append(card);
     localStorage.setItem("City", cityInputEl.value.trim());
     pastCityButtonEl.append(previousCity);
     


 }

 var renderFiveDayForecastDayOne = function(weather) {
  
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
    card.classList.add("card", "main-weather", "daily-one");
    card.setAttribute("style", "width: 20rem;");
    cardContainer.classList.add("card-body");
    card.append(cardContainer);
    cardHeader.setAttribute("class", "card-title");
    cardIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`)
    cardIcon.setAttribute("class", "weather-img");
    cardTemp.setAttribute("class", "card-text");
    cardWind.setAttribute("class", "card-text");
    cardHumidity.setAttribute("class", "card-text");
    cardHeader.textContent = cityInputEl.value.trim();
    cardHeader.append(cardIcon);
    var cityTempDecimal = (weather.temp.day - 273.15) * (9/5) + 32;
    var cityTemp = cityTempDecimal.toFixed(2);
    cardTemp.textContent = `Temperature: ${cityTemp} °F`
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
    futureWeatherOneEl.innerHTML = "";
    futureWeatherOneEl.append(card);

 }

 var renderFiveDayForecastDayTwo = function(weather) {
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
    card.classList.add("card", "main-weather", "daily-two");
    card.setAttribute("style", "width: 20rem;");
    cardContainer.classList.add("card-body");
    card.append(cardContainer);
    cardHeader.setAttribute("class", "card-title");
    cardIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`)
    cardIcon.setAttribute("class", "weather-img");
    cardTemp.setAttribute("class", "card-text");
    cardWind.setAttribute("class", "card-text");
    cardHumidity.setAttribute("class", "card-text");
    cardHeader.textContent = cityInputEl.value.trim();
    cardHeader.append(cardIcon);
    var cityTempDecimal = (weather.temp.day - 273.15) * (9/5) + 32;
    var cityTemp = cityTempDecimal.toFixed(2);
    cardTemp.textContent = `Temperature: ${cityTemp} °F`
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
    futureWeatherTwoEl.innerHTML = "";
    futureWeatherTwoEl.append(card);

 }

 var renderFiveDayForecastDayThree = function(weather) {
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
    card.classList.add("card", "main-weather", "daily-three");
    card.setAttribute("style", "width: 20rem;");
    cardContainer.classList.add("card-body");
    card.append(cardContainer);
    cardHeader.setAttribute("class", "card-title");
    cardIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`)
    cardIcon.setAttribute("class", "weather-img");
    cardTemp.setAttribute("class", "card-text");
    cardWind.setAttribute("class", "card-text");
    cardHumidity.setAttribute("class", "card-text");
    cardHeader.textContent = cityInputEl.value.trim();
    cardHeader.append(cardIcon);
    var cityTempDecimal = (weather.temp.day - 273.15) * (9/5) + 32;
    var cityTemp = cityTempDecimal.toFixed(2);
    cardTemp.textContent = `Temperature: ${cityTemp} °F`
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
    futureWeatherThreeEl.innerHTML = "";
    futureWeatherThreeEl.append(card);

 }

 var renderFiveDayForecastDayFour = function(weather) {
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
    card.classList.add("card", "main-weather", "daily-four");
    card.setAttribute("style", "width: 20rem;");
    cardContainer.classList.add("card-body");
    card.append(cardContainer);
    cardHeader.setAttribute("class", "card-title");
    cardIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`)
    cardIcon.setAttribute("class", "weather-img");
    cardTemp.setAttribute("class", "card-text");
    cardWind.setAttribute("class", "card-text");
    cardHumidity.setAttribute("class", "card-text");
    cardHeader.textContent = cityInputEl.value.trim();
    cardHeader.append(cardIcon);
    var cityTempDecimal = (weather.temp.day - 273.15) * (9/5) + 32;
    var cityTemp = cityTempDecimal.toFixed(2);
    cardTemp.textContent = `Temperature: ${cityTemp} °F`
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
    futureWeatherFourEl.innerHTML = "";
    futureWeatherFourEl.append(card);

 }

 var renderFiveDayForecastDayFive = function(weather) {
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
    card.classList.add("card", "main-weather", "daily-five");
    card.setAttribute("style", "width: 20rem;");
    cardContainer.classList.add("card-body");
    card.append(cardContainer);
    cardHeader.setAttribute("class", "card-title");
    cardIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`)
    cardIcon.setAttribute("class", "weather-img");
    cardTemp.setAttribute("class", "card-text");
    cardWind.setAttribute("class", "card-text");
    cardHumidity.setAttribute("class", "card-text");
    cardHeader.textContent = cityInputEl.value.trim();
    cardHeader.append(cardIcon);
    var cityTempDecimal = (weather.temp.day - 273.15) * (9/5) + 32;
    var cityTemp = cityTempDecimal.toFixed(2);
    cardTemp.textContent = `Temperature: ${cityTemp} °F`
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
    futureWeatherFiveEl.innerHTML = "";
    futureWeatherFiveEl.append(card);

 }


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






pastCityButtonEl.addEventListener("submit", submitWeather);
weatherFormEl.addEventListener("submit", submitWeather);