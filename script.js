// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// Access Key: a62c7d10877c661b208fffa0f58b2658

// var apiUrl = 'http://api.openweathermap.org/'

// current and future conditions for that city and that city is added to the search history
console.log(document.location.search)

var searchInputEl = document.querySelector('.search-bar')
var searchButtonEl = document.querySelector('.search-button')
var listParentEl = document.querySelector('.list-parent')

if ((localStorage.getItem('cityListStored') === null)) {
    var cityList = [];
} else {
    var cityList = window.localStorage.getItem('cityListStored');
    cityList = cityList.split(',')
    console.log(cityList)
    console.log(typeof cityList)
    createCityListButtons()
}

function createCityListButtons() {
    for (i = 0; i < cityList.length; i++) {
        var btnEl = document.createElement('button');
        btnEl.textContent = cityList[i];
        btnEl.classList.add('button');
        listParentEl.appendChild(btnEl);

    }
}

function addCityToList(cityName) {
    var btnEl = document.createElement('button');
    btnEl.textContent = cityName;
    btnEl.classList.add('button');
    listParentEl.appendChild(btnEl);


}

var formSubmitHandler = function (event) {

    event.preventDefault();
    var city = searchInputEl.value

    if (city) {
        getCityLatLon(city);
        saveCity(city);
    } else {
        console.log('enter city')
    }

};



var getCityLatLon = function (cityName) {

    var apiZip = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=a62c7d10877c661b208fffa0f58b2658';

    fetch(apiZip)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    var lat = data[0].lat
                    var lon = data[0].lon
                    var cityName = data[0].name

                    getWeather(lat, lon)
                    addCityToList(cityName)
                });
            } else {
                console.log('dne');
            }

        })
}


var getWeather = function (lat, lon) {

    var apiLatLon = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=a62c7d10877c661b208fffa0f58b2658'
    console.log(apiLatLon)

    fetch(apiLatLon)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayDailyWeather(data);
                    displayForecast(data)

                });
            } else {
                console.log('dne');
            }

        })
}

var saveCity = function (cityName) {

    cityList.push(cityName)

    window.localStorage.setItem('cityNameStored', cityName)
    window.localStorage.setItem('cityListStored', cityList)

}

// city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
var displayDailyWeather = function (data) {

    var cityName = data.city.name
    var unixDay = data.list[0].dt
    var day = dayjs.unix(unixDay).format('MM-DD-YY');
    var iconCode = data.list[0].weather[0].icon
    var weather = data.list[0].main
    var tempK = weather.temp
    var tempF = Math.round(((tempK - 273.15) * (9 / 5)) + 32);
    var humidity = weather.humidity;
    var windSpeed = (data.list[0].wind.speed)

    var dailyDivEl = document.querySelector('.daily')

    var h2El = document.createElement('h2');
    var olEl = document.createElement('ol');
    var tempEl = document.createElement('li');
    var humidityEl = document.createElement('li');
    var windEl = document.createElement('li')

    // icon stuff
    var iconEl = document.createElement('img');
    var iconSrc = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'
    iconEl.setAttribute('id', 'wicon')
    iconEl.setAttribute('src', iconSrc)
    iconEl.setAttribute('alt', 'weather icon')


    h2El.textContent = cityName + ' ' + day
    tempEl.textContent = tempF + ' F';
    humidityEl.textContent = humidity + '%';
    windEl.textContent = windSpeed + ' mps';


    dailyDivEl.appendChild(h2El);
    dailyDivEl.appendChild(iconEl);
    dailyDivEl.appendChild(olEl);
    olEl.appendChild(tempEl);
    olEl.appendChild(humidityEl);
    olEl.appendChild(windEl);

}

//  5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
var displayForecast = function (data) {

    console.log(data)

    var cityName = data.city.name

    for (i = 1; i < data.list.length; i = i + 8) {

        var unixDay = data.list[i].dt
        var day = dayjs.unix(unixDay).format('MM-DD-YY');
        var iconCode = data.list[i].weather[0].icon
        var weather = data.list[i].main
        var tempK = weather.temp
        var tempF = Math.round(((tempK - 273.15) * (9 / 5)) + 32);
        var humidity = weather.humidity;
        var windSpeed = (data.list[i].wind.speed)

        var forecastDivEl = document.querySelector('.forecast')

        var h2El = document.createElement('h2');
        var olEl = document.createElement('ol');
        var tempEl = document.createElement('li');
        var humidityEl = document.createElement('li');
        var windEl = document.createElement('li')

        // icon stuff
        var iconEl = document.createElement('img');
        var iconSrc = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'
        iconEl.setAttribute('id', 'wicon')
        iconEl.setAttribute('src', iconSrc)
        iconEl.setAttribute('alt', 'weather icon')


        h2El.textContent = cityName + ' ' + day
        tempEl.textContent = tempF + ' F';
        humidityEl.textContent = humidity + '%';
        windEl.textContent = windSpeed + ' mps';


        forecastDivEl.appendChild(h2El);
        forecastDivEl.appendChild(iconEl);
        forecastDivEl.appendChild(olEl);
        olEl.appendChild(tempEl);
        olEl.appendChild(humidityEl);
        olEl.appendChild(windEl);

    }

}


searchButtonEl.addEventListener('click', formSubmitHandler);