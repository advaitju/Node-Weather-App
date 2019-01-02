const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);

    request({
      url: `https://www.mapquestapi.com/geocoding/v1/address?key=zRsNbo2Vyxl0kdPTqmdzrVaRthlvO9IY&location=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to server.');
      } else if (body.results[0].locations[0] === undefined && body.results[0].locations[0] === undefined) {
        reject('Could not find address.');
      } else {
        var data = body.results[0].locations[0];
        resolve({
          address: `${data.street}, ${data.adminArea5}, ${data.adminArea3} ${data.postalCode.substring(0,5)}, ${data.adminArea1}`,
          latitude: `${data.latLng.lat}`,
          longitude: `${data.latLng.lng}`
        });
      }
    });
  });
};

geocodeAddress('1 smith street')
.then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
})
.catch((errorMessage) => {
  console.log(errorMessage);
});
