const getCityName = () => {
    city = prompt('Please enter the city Name')

    if(city == "") {
        alert('That is not a vaild city name.')
        return false
    }
    return city
}

const getWeather = (city) => {
    city.trim().toLowerCase()
    let cityInfo = {}
    cityFound = false;
    for(key in weather) {
        if(key == city) {
            cityInfo = {
                city: key,
                tempC: Math.round(weather[key].temp),
                tempF: Math.round((weather[key].temp * 1.8) + 32),
                humidity: weather[key].humidity
            }
            cityFound = true;
            break;
        } 
    }
    if(cityFound) {
        return cityInfo
    } else {
        return cityFound
    }
}

const displayWeather = () => {
    city = getCityName()

    
    if(city != false) {
        currentWeather = getWeather(city);
        if(currentWeather != false) {
            console.log(`It is currently ${currentWeather.tempC}°C (${currentWeather.tempF}°F) in Paris with a humidity of ${currentWeather.humidity}`)
        } else {
            alert("Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney")
        }
    } else {
        // a function that returns itself if the user enters ""
        displayWeather();
    }
}

displayWeather()
