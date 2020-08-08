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
   
    tempElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML=response.data.name;
    descripElement.innerHTML=response.data.weather[0].description;
    humidElement.innerHTML=response.data.main.humidity;
    pressureElement.innerHTML=response.data.main.pressure;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt*1000);
   
   }


let apiKey="577759180b250273cb6dd606dacb4cd6";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature)
 
