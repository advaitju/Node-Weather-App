console.log('Starting app');

setTimeout(() => {
  console.log('Inside of callback');
}, 2000);

setTimeout(() => {
  console.log('setTimeout: 0s');
}, 0);

console.log('Finishing up');
