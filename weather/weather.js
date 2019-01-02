const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/d5e2094530c7a0dbfbb8b5ea2cdbc72e/${lat},${lng}?units=si`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to servers.');
      } else if (body.code === 400) {
      callback('Unable to fetch weather.');
    } else {
      callback(undefined, body.currently.temperature);
    }
  });
}

module.exports = {
  getWeather
}
