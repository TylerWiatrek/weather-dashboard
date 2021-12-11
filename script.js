// Establishing my global variables here that I will call in the later functions
// These will grab the id tags I set in my html file so I can dynamically create elements

// This weather form will mainly be use for the click add event listener to initialize the main function 
// once the search button is clicked
var weatherFormEl = document.querySelector("#weather-form");
// This current city element will be used in the current city function to append the content to the main current weather div
var currentCityEl = document.querySelector("#current-city");
// This five day forecast element will be used to dynamically display the five day forecast text content above the weather forecast
var fiveDayForecastEl = document.querySelector("#five-day-forecast");
// The next five elements will be use to create each of the 5 day forecast cards for the inputted city
var futureWeatherOneEl = document.querySelector("#future-weather-one");
var futureWeatherTwoEl = document.querySelector("#future-weather-two");
var futureWeatherThreeEl = document.querySelector("#future-weather-three");
var futureWeatherFourEl = document.querySelector("#future-weather-four");
var futureWeatherFiveEl = document.querySelector("#future-weather-five");
// This city input will be used to grab the city name. The term cityInputEl.value.trim will be used later in the code
// This will grab the value that the user inputted into the search bar. This will be used later in the code to get coordinates, weather, etc.
var cityInputEl = document.querySelector("#city");
// This button element will be used to dynamically create the past cities search buttons below the search button
var pastCityButtonEl = document.getElementById("past-search");

// This function is used to grab the coordinates from the inputted city. Since the user just inputs a city and not coordinates,
// the coordinates must be grabbed in order to get the right data. Starting the function here that has the parameter of city.
var getCoordinates = function(city) {
    // declaring a variable here to call the api. this api is used to grab the coordinates for the inputted city.
    var apiUrlCoordinates = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ea8fea258bbf4c7d30e6cc6067e3356`
    // using fetch here to return the data from this api call
    fetch(apiUrlCoordinates)
        .then(function(response) {
            return response.json()
        }).then(function(data){
            // using the console.log here to determine if the coordinates were grabbed correctly
            console.log(data.coord)
            // calling the getWeather function here so that we can pass through the data.coord parameter to correctly display
            // the coordinates to the function. Since the API uses coordinates and not a city name, we need to pass the coordinates through 
            // to get the proper location. 
            // The function needs to be called here in order to keep the data flowing.
            getWeather(data.coord)
        });       
    };

// This function is being created to get the actual weather data that will be used later in the code.
// The API called in this function needs coordinates, which was obtained from the above function getCoordinates.
// Started the function here passing through coordinates as the parameters
var getWeather = function(coordinates) {
    // declaring the latitude and longitude values here. Using {} to grab the lat and lon objects.
    var {lat} = coordinates;
    var {lon} = coordinates;
    // console.log the lat and lon values to ensure that the code is producing the correct longitude and latitue values for the city.
    console.log(lat);
    console.log(lon);
    // Once the latitude and longitue have been identified and stored in variables, now the API for the weather info needs to be called
    // Here the API is called with 2 values that were declared previously (lat) and (lon). Without these, the API would return an error.
    // This API will return all the weather data needed in order to dynamically created the webpage.
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=2ea8fea258bbf4c7d30e6cc6067e3356`
    // fetching the data here and then returning a response
    fetch(apiUrl)
    .then(function(response) {
        return response.json()
    }).then(function(data){
        // console.log the data here in order to ensure the right data is being returned.
        // Once the data has been identified and is correct, another function will need to be called.
        console.log(data)
        // Calling the renderWeather function here, the renderWeather function is set a few lines down.
        // This is the main function that will actually display the data the user is looking for.
        // Passing through 2 parameters in this function. City and data. The city is needed in order to ensure the function
        // is obtaining the right data for the city inputting by the user and not a random city. The data is being used in order
        // to gather and sort the data created by the fetch/return calls of the API. By using the city and data, this function
        // should be able to run and get the correct data for the city inputted.
        renderWeather(city, data);
    });
    
}
// Here the renderWeather function is being created, this function was previously called in the above lines.
// Inside this function, there is multiple other functions being called.
var renderWeather = function(city, data){
    // The first function being called is renderCurrentForecast. This function created later will generate the current weather 
    // for the city inputted by the user.
    // The first renderCurrentForecast function here, the city and data.current will be used. The data.current is needed because
    // this will display the current weather for the city inputted.
    renderCurrentForecast(city, data.current);
    // The following next five functions being declared will call the data that is being displayed in the daily array. The api data
    // displays the future forecast in the daily array, so day one would be position daily[0] and so forth. This will be repeated for 
    // however many days the forecast needs to display. Since there is a 5 day forecast being display, the data.daily needs to be called
    // five times starting at data.daily[0] for postion 1 in the array, all the way to data.daily[4] for position 5 in the array.
    renderFiveDayForecastDayOne(data.daily[0]);
    renderFiveDayForecastDayTwo(data.daily[1]);
    renderFiveDayForecastDayThree(data.daily[2]);
    renderFiveDayForecastDayFour(data.daily[3]);
    renderFiveDayForecastDayFive(data.daily[4]);

 }

 // This is the first function that needs to be called. This will render the current forecast for the inputted city and give us the 
 // weather data needed from the api call
 var renderCurrentForecast = function(city, weather) {
     // Dynamically creating the card element here starting with the h2 tag that will display the text "Current Weather"
     // Giving this dynamically created element the class of current-weather-title to later change the style in css.
     var headerTitle = document.createElement("h2");
     headerTitle.classList.add("current-weather-title");
     headerTitle.textContent = "Current Weather";
     // Dynamically creating another h2 tag here for the future weather section. Giving this h2 tag the class of
     // future-weather-title to later change the style in css. Also giving this h2 tag the text content of "5 Day Forecast"
     var futureTitle = document.createElement("h2");
     futureTitle.classList.add("future-weather-title");
     futureTitle.textContent = "5 Day Forecast";
     // Dynamically creating the button element here that will display the previous city the user searched for. Using bootstrap styling
     // there are 5 different styles being used in the class list. The text content of this button needs to be the previous city
     // that was searched for so cityInputEl.value.trim() will be used as the text content since that is the value that the user
     // inputted. trim() is being used to trim off any unnecessary spaceing the user might be entered in the search box.
     var previousCity = document.createElement("button");
     previousCity.setAttribute("type", "submit");
     previousCity.classList.add("bg-info", "text-light", "p-1", "m-2", "col-12")
     previousCity.textContent = cityInputEl.value.trim();
     // Declaring multiple variables here starting with card and giving it a div element. Next the cardContainer is being created
     // using another div element. Next the cardHeader is being created with an h2 tag that later display the city name. Next the
     // cardIcon is being created that will later hold the weather icon symbol. Next, the cardTemp is being created with a p tag.
     // This p tag will hold the current city's temperature that will be pulled from the api. Next, the cardWind is being created
     // with a p tag, this will hold the value of the wind_speed that is being pulled from the api. Next, the cardHumidity is being
     // created with a p tag, this will hold the humidity data pulled from the api. Next, the cardUV is being created with a p tag,
     // this will hold the uvi value that will be pulled from the api. Finally, the uvButton is being created with a button tag,
     // this button will hold the uvi value.
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




pastCityButtonEl.addEventListener("submit", submitWeather);
weatherFormEl.addEventListener("submit", submitWeather);