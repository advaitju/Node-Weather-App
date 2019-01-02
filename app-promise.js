const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to fetch weather for.',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://www.mapquestapi.com/geocoding/v1/address?key=zRsNbo2Vyxl0kdPTqmdzrVaRthlvO9IY&location=${encodedAddress}`;

axios.get(geocodeURL)
.then((response) => {
  if (response.data.results[0].locations[0]) {
    var data = response.data.results[0].locations[0];

    if (data.street === "" && data.adminArea6 == "") {
      throw new Error('Unable to find address.');
    }

    var lat = data.latLng.lat;
    var lng = data.latLng.lng;
    var weatherURL = `https://api.darksky.net/forecast/d5e2094530c7a0dbfbb8b5ea2cdbc72e/${lat},${lng}?units=si`;
    console.log(`${data.street}, ${data.adminArea5}, ${data.adminArea3} ${data.postalCode.substring(0,5)}, ${data.adminArea1}`);

    return axios.get(weatherURL);
  }
})
.then((response) => {
  console.log(`Temperature: ${response.data.currently.temperature}`);
})
.catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API server.');
  } else {
    console.log(e.message);
  }
});
