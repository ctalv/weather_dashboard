// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

var urlZip = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=a62c7d10877c661b208fffa0f58b2658'
var urlLatLon = 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=a62c7d10877c661b208fffa0f58b2658'

var testUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=a62c7d10877c661b208fffa0f58b2658'

fetch(testUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });