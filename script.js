// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// Access Key: a62c7d10877c661b208fffa0f58b2658

// var apiUrl = 'http://api.openweathermap.org/'

// current and future conditions for that city and that city is added to the search history
console.log(document.location.search)

var searchInputEl = document.querySelector('.search-bar')
var searchButtonEl = document.querySelector('.search-button')


var formSubmitHandler = function (event) {

    event.preventDefault();
    var city = searchInputEl.value

    if (city) {
        getCityLatLon(city);
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
                });
            } else {
                console.log('dne');
            }

        })
}



var getWeather = function () {
    var apiLatLon = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=a62c7d10877c661b208fffa0f58b2658'
    console.log(apiLatLon)
}

// fetch(apiUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

searchButtonEl.addEventListener('click', formSubmitHandler);