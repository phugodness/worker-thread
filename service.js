const { workerData, parentPort } = require('worker_threads')
const { firstArray, secondArray } = workerData;
const { Readable } = require('stream');

parentPort.postMessage(new Set(firstArray.concat(secondArray)).size !== (firstArray.length + secondArray.length));

// const isOverlapArray = (firstArray, secondArray) => {
//   let smallerArray = [];
//   let biggerArray = [];
//   if (firstArray.length < secondArray.length) {
//     smallerArray = firstArray;
//     biggerArray = secondArray;
//   } else {
//     smallerArray = secondArray;
//     biggerArray = firstArray;
//   }
//   const arraySet = new Set(biggerArray);
//   let isOverlap = false;

//   for (const iterator of smallerArray) {
//     if (arraySet.has(iterator)) isOverlap = true;
//   }

//   return isOverlap;
// }

// parentPort.postMessage(isOverlapArray(firstArray, secondArray));

// let smallerArray = [];
// let biggerArray = [];
// if (firstArray.length < secondArray.length) {
//   smallerArray = firstArray;
//   biggerArray = secondArray;
// } else {
//   smallerArray = secondArray;
//   biggerArray = firstArray;
// }
// const arraySet = new Set(biggerArray);
// let isOverlap = false;
// const readableStream = Readable.from(smallerArray);
// readableStream.on('data', function (chunk) {
//   if (arraySet.has(chunk)) {
//     isOverlap = true;
//   };
// }).on('end', () => {
//   parentPort.postMessage(isOverlap)
// });


// let counter = 0;
// readableStream.on('data', function (chunk) {
//   counter += 1;
//   if (counter === (workerData.length - 1)) {
//     console.log({counter});
//     parentPort.postMessage({ counter })
//   }
// });

// workerData.forEach((e, i) => {
//   counter += 1;
//   if (counter === (i - 10)) {
//     console.log({counter});
//     parentPort.postMessage({ counter })
//   }
// })
