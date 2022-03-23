//In your project, display the current date and time using JavaScript: Tuesday 16:00
let key = '8ce0a35d2a13fe92920704c88ae78c6d'

const updateTime = () => {
    let currentTime = document.querySelector("#curren_time")
    let currentDate = new Date()

    console.log(currentTime)
    let fromatedDate = currentDate.toLocaleDateString("en-us",
        {
            weekday: "long",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit"
        })
    currentTime.innerHTML = fromatedDate
}

updateTime()


//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
const getCityName = () => {
    let search = document.querySelector('#search');
    let errorMessage = document.querySelector('#error_message')
    console.log(search)
    console.log()

    if(search.value === "") {
        errorMessage.style.display = "inline-block"
        return false;
    } else {
        errorMessage.style.display = "none"
        return search.value;
    }
}
let searchForm = document.querySelector("#search_form")

const currentWeather = (response) => {
    let city = document.querySelector('#location')
    let currentTemp = document.querySelector('#current_temp')
    let currentHumidity = document.querySelector('#current_humidity')
    let currentCondition = document.querySelector('#current_condition')
    console.log(response.data)
    let currentSpeed = document.querySelector('#current_speed')
    let currentIcon = document.querySelector('.weather_icons.current_image')
    console.log("test current icon", currentIcon)

    currentTemp.innerHTML =  Math.round(response.data.main.temp)
    currentHumidity.innerHTML = response.data.main.humidity
    currentCondition.innerHTML = response.data.weather[0].description
    currentSpeed.innerHTML = Math.round(response.data.wind.speed)
    city.innerHTML = response.data.name
    currentIcon.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    
}

const searchByName = async (event) => {
    event.preventDefault()

    city = getCityName();
    if(city != false) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
        await axios.get(url).then(currentWeather)        
    } 
}

const defaultCity = async(event) => {
    let city = 'Sydney'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
    await axios.get(url).then(currentWeather)      
}

defaultCity()
searchForm.addEventListener('submit', searchByName);

//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

const convertTemperature = (event) => {
    event.preventDefault()
    let currentTemp = document.querySelector('#current_temp')
    let convert = document.querySelector('#convert')

    if(convert.innerHTML === '°C') {
        currentTemp.innerHTML = Math.round((currentTemp.innerHTML * 1.8) + 32)
        convert.innerHTML = '°F'
    } else {
        currentTemp.innerHTML = Math.round((currentTemp.innerHTML - 32) * .55)
        convert.innerHTML = '°C'
    }
}

let convert = document.querySelector('#convert')
convert.addEventListener('click', convertTemperature)

const getGeoData = (event) => {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition((sendGeoData));
}

const sendGeoData = async (position) => {
    let latitude = '';
    let longitude = '';
  
  
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    if(latitude != '' && longitude != '')
    {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`
        await axios.get(url).then(currentWeather) 
    }       
}

let currentLocation = document.querySelector('#get_current_location')

currentLocation.addEventListener('click', (getGeoData))