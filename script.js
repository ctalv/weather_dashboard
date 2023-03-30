// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// Access Key: a62c7d10877c661b208fffa0f58b2658

// var apiUrl = 'http://api.openweathermap.org/'

// current and future conditions for that city and that city is added to the search history
var searchInputEl = document.querySelector('.search-bar')
var searchButtonEl = document.querySelector('.search-button')

function citySearch() {

    searchButtonEl.addEventListener('click', function () {

        var city = searchInputEl.value
        

        if (city === '') {
            console.log('nothing entered')
            console.log(searchInputEl.textContent)

        } else {

            var apiZip = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=a62c7d10877c661b208fffa0f58b2658';

            console.log(apiZip)

            fetch(apiZip)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                })
                .catch(function (err) {
                    console.log(err);
                });

            console.log('worked')
        }
    });

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

citySearch();