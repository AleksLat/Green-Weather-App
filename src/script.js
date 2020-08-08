function showTemperature(response){

    let tempElement = document.querySelector("#currTemperature");
    let cityElement = document.querySelector("#choosencity");
    let descripElement = document.querySelector("#description");
    let humidElement = document.querySelector("#humidity");
    let pressureElement = document.querySelector("#pressure");
    let windElement = document.querySelector("#wind-speed");
    
   
    tempElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML=response.data.name;
    descripElement.innerHTML=response.data.weather[0].description;
    humidElement.innerHTML=response.data.main.humidity;
    pressureElement.innerHTML=response.data.main.pressure;
    windElement.innerHTML=Math.round(response.data.wind.speed);
   
   }


let apiKey="577759180b250273cb6dd606dacb4cd6";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature)
 
