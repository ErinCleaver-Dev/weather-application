//In your project, display the current date and time using JavaScript: Tuesday 16:00
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
const getCityName = (event) => {
    event.preventDefault()
    let search = document.querySelector('#search');
    let errorMessage = document.querySelector('#error_message')
    let city = document.querySelector('#location')
    console.log(search)
    console.log()

    if(search.value === "") {
        errorMessage.style.display = "inline-block"
        return false;
    } else {
        errorMessage.style.display = "none"
        city.innerHTML = search.value;
        return city;
    }
}
let searchForm = document.querySelector("#search_form")

getCitiesWeather = () => {
    city = getCityName();

    if(city != false) {
        
    }
}

searchForm.addEventListener('submit', getCityName);




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


