const EXAMPLECITY = "Berlin";
let units = "metric";
const APPID = 'b0b170dda1a5a40c37d43dc40e5c1170';
let fPromise = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${EXAMPLECITY}&appid=${APPID}&units=${units}`);
let currentCity = 'Berlin'

const tempElem = document.querySelector(".temp");
const placeElem = document.querySelector(".place");
const highElem = document.querySelector(".high");
const lowElem = document.querySelector(".low");
const weatherDetail = document.querySelector('.current-weather');

const locationInput = document.querySelector("input#location");
const submitBtn = document.querySelector("button");
const form = document.querySelector("form");
const system = document.querySelector("#system");

const body = document.querySelector('body');
const img = document.querySelector("img")

function decipherWeather(weatherJSON) {
    console.log(weatherJSON)
    const returnedObject = {};
    returnedObject["high"] = weatherJSON.main.temp_max;
    returnedObject["low"] = weatherJSON.main.temp_min;
    returnedObject["temp"] = weatherJSON.main.temp;
    returnedObject["weather"] = weatherJSON.weather[0].description;
    returnedObject["name"] = weatherJSON.name
    returnedObject["main-weather"] = weatherJSON.weather[0].main;
    returnedObject["weatherId"] = weatherJSON.weather[0].id;
    return returnedObject
}

function capitalize(str) {
    if (str.split(' ').length > 1) {
        return str.split(' ').map((val) => capitalize(val)).join(' ');
    }
    return str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().substring(1);
}
function getWeather(city, units="imperial") {
    //Would be the loading component
    console.log("Starting...")
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APPID}&units=${units}`)
    .then(function(value) {
        return value.json();
    })
    .then(function(value) {
        //Remove loading component.
        console.log("Completed.")
        if (value.cod === 200) {
            console.log(value);


            displayWeather(decipherWeather(value))
        }
        else {

            console.log("Incorrect input.")
        }

        
    });
}

function displayWeather(info) {
    highElem.textContent = `${Math.round(info.high)}°`;
    lowElem.textContent = `${Math.round(info.low)}°`;
    tempElem.textContent = `${Math.round(info.temp)}${units == "metric" ? "°C" : "°F"}`;
    placeElem.textContent = info.name;
    weatherDetail.textContent = capitalize(info.weather);
    console.log(info["main-weather"])

    switch (info["main-weather"]) {
        case "Thunderstorm":
            body.style.backgroundImage = 'url(images/Thunderstorm.jpg)';
            break;
        case "Snow":
            body.style.backgroundImage = 'url(./images/snow.jpg)';
            //add dark background
            break;
        case 'Clouds':
            if (info.weather == 'overcast clouds' || info.weather == 'broken clouds') {
                body.style.backgroundImage = 'url(./images/vcloudy.jpg)';
            } else if (info.weather == 'few clouds' || info.weather == 'scattered clouds') {
                body.style.backgroundImage = 'url(./images/partly.jpg)';
            }
            break;
        case 'Drizzle':
            body.style.backgroundImage = 'url(./images/rain.jpg)';
            break;
        case 'Rain':
            if (info['weatherId'] == 511) {
                body.style.backgroundImage = 'url(./images/snow.jpg)';
            }
            body.style.backgroundImage = 'url(./images/rain.jpg)';
            break;
        case 'Clear':
            body.style.backgroundImage = 'url(./images/clear.jpg)';
            break;
        default:
            if (`${info['weatherId']}`.charAt(0) == 7) {
                body.style.backgroundImage = 'url(images/mist.jpg)';
                break;
            }
    }
    // console.log("Before");
    // fetch(`https://api.giphy.com/v1/gifs/translate?api_key=fnzPqHUsk7g6JNu4UBX5eY5OUfP9no4g&s=${info.weather}`)
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data);
    //     img.src = data.data.images.original.url;
    // });
    // console.log("Yup");
}

getWeather(currentCity, units);


function eventFunction(e) {
    currentCity = locationInput.value;
    getWeather(currentCity, units);
    e.preventDefault();
}
submitBtn.addEventListener("click", eventFunction);

form.addEventListener("submit", eventFunction)

system.addEventListener("click", function() {
    if (units == "imperial") {
        system.textContent = "C°";
        units = "metric";
    } else {
        system.textContent = "F°";
        units = "imperial";
    }

    getWeather(currentCity, units);
})

