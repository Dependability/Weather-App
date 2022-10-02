const EXAMPLECITY = "Berlin";
let units = "metric";
const APPID = 'b0b170dda1a5a40c37d43dc40e5c1170';
let fPromise = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${EXAMPLECITY}&appid=${APPID}&units=${units}`);
let currentCity = 'Berlin'

const tempElem = document.querySelector(".temp");
const placeElem = document.querySelector(".place");
const highElem = document.querySelector(".high");
const lowElem = document.querySelector(".low");


const locationInput = document.querySelector("input#location");
const submitBtn = document.querySelector("input[type='button']");
const form = document.querySelector("form");
const system = document.querySelector("#system");

const img = document.querySelector("img")

function decipherWeather(weatherJSON) {
    const returnedObject = {};
    returnedObject["high"] = weatherJSON.main.temp_max;
    returnedObject["low"] = weatherJSON.main.temp_min;
    returnedObject["temp"] = weatherJSON.main.temp;
    returnedObject["weather"] = weatherJSON.weather[0].description;
    returnedObject["name"] = weatherJSON.name
    return returnedObject
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
    highElem.textContent = info.high;
    lowElem.textContent = info.low;
    tempElem.textContent = info.temp;
    placeElem.textContent = info.name;
    console.log("Before");
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=fnzPqHUsk7g6JNu4UBX5eY5OUfP9no4g&s=${info.weather}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        img.src = data.data.images.original.url;
    });
    console.log("Yup");
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
    units = system.checked ? "metric" : "imperial";
    getWeather(currentCity, units);
})

