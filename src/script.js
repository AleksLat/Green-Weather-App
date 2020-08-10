function formatDate(timestamp){

    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours<10){
     hours = `0${hours}`;
   }
    let minutes = date.getMinutes();
       if (minutes<10){
         minutes = `0${minutes}`;
       }
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
   
   return `${day} ${hours}:${minutes}`;
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

   function search(city) {
    let apiKey="577759180b250273cb6dd606dacb4cd6";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature)
  
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

let celsiusTemp = null;

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", handleSubmit);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showfahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showcelsiusTemp );

search("San Francisco");
 
