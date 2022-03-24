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

    if(search.value === "") {
        errorMessage.style.display = "inline-block"
        return false;
    } else {
        errorMessage.style.display = "none"
        return search.value;
    }
}
let searchForm = document.querySelector("#search_form")

const forecast = response => {
    let daily = document.querySelectorAll('.daily')
    for(let i = 0; i < daily.length; i++) {
        daily[i].querySelector('.day').innerHTML = convertDay(response.data.daily[i].dt)
        daily[i].querySelector('.day_temp .min').innerHTML = Math.round(response.data.daily[i].temp.min)
        daily[i].querySelector('.day_temp .max').innerHTML = Math.round(response.data.daily[i].temp.max)
        daily[i].querySelector('.day_condition').innerHTML = response.data.daily[i].weather[0].main
        daily[i].querySelector('.day_icon').src=`https://openweathermap.org/img/wn/${response.data.daily[i].weather[0].icon}@2x.png` 
        
    }
}

const convertDay = (date) => {
    let day = new Date(date * 1000)
    day = day.toLocaleDateString('en-us' ,{weekday: "short"}).split(' ')[0]
    return day
}

const currentWeather = (response) => {
    let city = document.querySelector('#location')
    let currentTemp = document.querySelector('#current_temp')
    let currentHumidity = document.querySelector('#current_humidity')
    let currentCondition = document.querySelector('#current_condition')
    let currentSpeed = document.querySelector('#current_speed')
    let currentIcon = document.querySelector('.weather_icons.current_image')
    currentTemp.innerHTML =  Math.round(response.data.main.temp)
    currentHumidity.innerHTML = response.data.main.humidity
    currentCondition.innerHTML = response.data.weather[0].description
    currentSpeed.innerHTML = Math.round(response.data.wind.speed)
    city.innerHTML = response.data.name
    currentIcon.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
}

const searchByName = (event) => {
    event.preventDefault()

    city = getCityName();
    if(city != false) {
        getAPICity('weather', city)    
        getAPICity('onecall', city)    
    } 
}

const getAPICity = async (type, city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`

    if(type == 'weather') {
        await axios.get(url).then(currentWeather)  
    } else if(type == 'onecall') {
        await axios.get(url).then(getCityGeoLocation)
    }
}

const getCityGeoLocation = async (response) => {
    let latitude = response.data.coord.lat
    let longitude = response.data.coord.lon
    console.log(latitude, longitude)
    let url = `https://api.openweathermap.org/data/2.5/onecall?&lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alert,current&units=metric&appid=${key}`
    await axios.get(url).then(forecast)
}


const getLocationAPI = async (type, latitude, longitude) => {
    let url = `https://api.openweathermap.org/data/2.5/${type}?&lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alert,current&units=metric&appid=${key}`
    if(type == 'weather') {
        await axios.get(url).then(currentWeather) 
    } else if(type == 'onecall') {
        console.log('testing forecast')
        console.log(url)
        await axios.get(url).then(forecast)
    }
}

const defaultCity = (event) => {
    let city = 'Lansing'

    getAPICity('weather', city)   
    getAPICity('onecall', city)   
}

defaultCity()
searchForm.addEventListener('submit', searchByName);

//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

const tempConver = (temp, temp2, convert) => {
    convert.trim()
    if(convert == 'C') {
        temp = Math.round((temp * 1.8) + 32)
        temp2 = Math.round((temp2 * 1.8) + 32)
        convert = 'F'
    } else if(convert == 'F') {
        temp = Math.round((temp - 32) * .55)
        temp2 = Math.round((temp2 - 32) * .55)
        convert = 'C'
    }
    return {
        temp: temp,
        temp2: temp2,
        convert: convert
    }
}

const dispalyConvertions = (event) => {
    event.preventDefault()
    let currentTemp = document.querySelector('#current_temp')
    let convert = document.querySelector('#convert')
    let convertions = tempConver(currentTemp.innerHTML,1 , convert.innerHTML)
    currentTemp.innerHTML = convertions.temp
    convert.innerHTML =  convertions.convert
    let daily = document.querySelectorAll('.daily')
    daily.forEach(day => {
        
        let min = day.querySelector('.day_temp .min')
        let max = day.querySelector('.day_temp .max')
        convert =day.querySelector('.day_temp .convert')
        convertions = tempConver(min.innerHTML, max.innerHTML, convert.innerHTML)
        min.innerHTML = convertions.temp;
        max.innerHTML = convertions.temp2;
        convert.innerHTML = convertions.convert

    })
}

let convert = document.querySelector('#convert')
convert.addEventListener('click', dispalyConvertions)

const getGeoData = (event) => {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition((sendGeoData));
}

const sendGeoData = (position) => {
    let latitude = '';
    let longitude = '';
  
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    if(latitude != '' && longitude != '')
    {
        getLocationAPI('weather', latitude, longitude)
        getLocationAPI('onecall', latitude, longitude)
    }       
}

let currentLocation = document.querySelector('#get_current_location')

currentLocation.addEventListener('click', getGeoData)