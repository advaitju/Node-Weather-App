const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://www.mapquestapi.com/geocoding/v1/address?key=zRsNbo2Vyxl0kdPTqmdzrVaRthlvO9IY&location=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to server.');
      return;
    }

    var data = body.results[0].locations[0];

    if (data.street === "" && data.adminArea6 == "") {
      callback('Could not find address.');
    } else {
      callback(undefined, {
        address: `${data.street}, ${data.adminArea5}, ${data.adminArea3} ${data.postalCode.substring(0,5)}, ${data.adminArea1}`,
        latitude: `${data.latLng.lat}`,
        longitude: `${data.latLng.lng}`
      });
    }
  });
};

module.exports = {
  geocodeAddress
};
