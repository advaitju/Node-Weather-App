var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers.');
      }
    }, 1500);
  });
}

asyncAdd(1, '2')
.then((result) => {
  console.log('Result: ', result)
  return asyncAdd(result, 5);
})
.then((result) => {
  console.log('Result: ', result);
})
.catch((errorMessage) => {
  console.log(errorMessage);
})

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('Success.');
//     reject('Failure.');
//   }, 2500);
// });
//
// somePromise.then((message) => {
//   console.log(message)
// }, (message) => {
//   console.log(message)
// });
