document.body.style.backgroundImage="url('images/background.gif')";

const weatherApi = {
    key: "83ad9a96715fb354fd8c3f8cd282e3ca",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const card=document.getElementById('search-bar');

card.addEventListener('keypress',(event)=>{
    if(event.keyCode == 13) 
    {
        console.log(card.value);
        getWeatherReport(card.value);
        document.querySelector('.matter').style.display = "block";
    }

});

function getWeatherReport(city) 
{
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`).then(weather=>{return weather.json();}).then(showWeatherReport);
}

function showWeatherReport(weather)
{
    console.log(weather);
    const { humidity } = weather.main;
    const { speed } = weather.wind
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;
    let humidityElement = document.querySelector(".humidity");
    humidityElement.innerText = "Humidity: " + humidity + "%";
    let windElement = document.querySelector(".wind");
    windElement.innerText = "Wind speed: " + speed + " km/h";

    let date=document.getElementById('date');
    let todayDate=new Date();
    date.innerText=dateManage(todayDate);
    if(weatherType.textContent=='Clear') {
        document.body.style.backgroundImage="url('images/clear sky.gif')"; 
    } else if(weatherType.textContent=='Clouds') {
        document.body.style.backgroundImage="url('images/cloudy.gif')";
    } else if(weatherType.textContent=='Haze') {
        document.body.style.backgroundImage="url('images/haze.gif')";
    }     else if(weatherType.textContent=='Rain') {
        document.body.style.backgroundImage="url('images/rain.gif')";
    } else if(weatherType.textContent=='Snow') {
        document.body.style.backgroundImage="url('images/snow.gif')";
    } else if(weatherType.textContent=='Thunderstorm'){
        document.body.style.backgroundImage="url('images/thunder strom.gif')";
    } else{
        document.body.style.backgroundImage="url('images/background.gif')";
    }
}

// Date manage
function dateManage(dateArg) {
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let year=dateArg.getFullYear();
    let month=months[dateArg.getMonth()];
    let date=dateArg.getDate();
    let day=days[dateArg.getDay()];
    return `${date}${month}(${day}),${year}`;
}


