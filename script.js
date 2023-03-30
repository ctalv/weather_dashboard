// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// Access Key: a62c7d10877c661b208fffa0f58b2658

// var apiUrl = 'http://api.openweathermap.org/'

// current and future conditions for that city and that city is added to the search history
console.log(document.location.search)

var searchInputEl = document.querySelector('.search-bar')
var searchButtonEl = document.querySelector('.search-button')

if ((localStorage.getItem('cityListStored') === null)) {
    var cityList = [];
} else {
    var cityList = window.localStorage.getItem('cityListStored');
    cityList = cityList.split(',')
    console.log(cityList)
    console.log(typeof cityList)
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

                    var unixDay = data.list[0].dt
                    console.log(unixDay)
                    var day = dayjs.unix(unixDay).format('MMM D, YYYY');
                    console.log(day)

                });
            } else {
                console.log('dne');
            }

        })
}

var saveCity = function (cityName) {
    console.log(cityName)

    cityList.push(cityName)

    window.localStorage.setItem('cityNameStored', cityName)
    window.localStorage.setItem('cityListStored', JSON.stringify(cityList))

}

searchButtonEl.addEventListener('click', formSubmitHandler);