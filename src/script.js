function formatDate(timestamp){

    let date = new Date(timestamp);
    let days = [
           "Sun", 
           "Mon", 
           "Tue", 
           "Wed",
           "Thu",
           "Fri",
           "Sat"
       ];
    let day = days[date.getDay()];
   
   return `${day} ${formatHours(timestamp)}`;
   }
   
function formatHours(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours<10){
     hours = `0${hours}`;
   }
    let minutes = date.getMinutes();
       if (minutes<10){
         minutes = `0${minutes}`;
       }
  
    return `${hours}:${minutes}`;
  }

function showTemperature(response){

    let tempElement = document.querySelector("#currTemperature");
    let cityElement = document.querySelector("#choosencity");
    let descripElement = document.querySelector("#description");
    let humidElement = document.querySelector("#humidity");
    let pressureElement = document.querySelector("#pressure");
    let windElement = document.querySelector("#wind-speed");
    let dateElement= document.querySelector("#date");
    let iconElement= document.querySelector("#icon");

    celsiusTemp = response.data.main.temp;
   
    tempElement.innerHTML=Math.round(celsiusTemp);
    cityElement.innerHTML=response.data.name;
    descripElement.innerHTML=response.data.weather[0].description;
    humidElement.innerHTML=response.data.main.humidity;
    pressureElement.innerHTML=response.data.main.pressure;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt*1000);
    iconElement.setAttribute("src", 
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",
            response.data.weather[0].description);
   }

function displayForecast(response){
  
    let forecastElement = document.querySelector("#futureForecast");
    let forecast = null;
   
    forecastElement.innerHTML=null;
   
    for (let index = 0; index < 5; index++) {
     forecast = response.data.list[index];
     forecastElement.innerHTML+=`
       <div class="col-xs-1 firstOffset day" id="p1">
       <h3 class="hourForecast">
          ${formatHours((forecast.dt)*1000)}
       </h3>
        <img 
        src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
        class="smallImage"
        alt="weathericon">
       <div class="temperatureMax">
           <strong>
                ${Math.round(forecast.main.temp_max)}C
            </strong>
       </div>
       <div class="temperatureMin">
             ${Math.round(forecast.main.temp_min)}C
       </div>
     </div>
       `;
      }
    }

function search(city) {
    let apiKey="577759180b250273cb6dd606dacb4cd6";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature)

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  
  }

function searchLocation(position){
    let apiKey = "577759180b250273cb6dd606dacb4cd6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude
    }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input"); 
    search(cityInputElement.value);
  }

  function showfahrenheitTemp(event) {
    event.preventDefault();
    let fahrenheitTemp = (celsiusTemp*9)/5+32;
  
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let tempElement=document.querySelector("#currTemperature");
    tempElement.innerHTML=Math.round(fahrenheitTemp);
  }

  function showcelsiusTemp(event) {
    event.preventDefault(); 
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let tempElement=document.querySelector("#currTemperature");
    tempElement.innerHTML = Math.round(celsiusTemp);
  }

function showCurrLoc(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

let celsiusTemp = null;

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", handleSubmit);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showfahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showcelsiusTemp );

let currentLocation = document.querySelector("#local-submit-info");
currentLocation.addEventListener("click", showCurrLoc);

search("San Francisco");
 
