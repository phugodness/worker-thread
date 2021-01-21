const { workerData, parentPort } = require('worker_threads')
const { Readable } = require('stream');
const readableStream = Readable.from(workerData);

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
let counter = 0;

readableStream.on('data', function (chunk) {
  console.log({counter});
  counter += 1;
  if (counter === (workerData.length - 1)) {
    console.log({counter});
    parentPort.postMessage({ counter })
  }
});

// workerData.forEach((e, i) => {
//   counter += 1;
//   if (counter === (i - 10)) {
//     console.log({counter});
//     parentPort.postMessage({ counter })
//   }
// })

// for (let i = 0; i < workerData.length; i++) {
//   counter += 1;
//   if (counter === (i - 10)) {
//     console.log({counter});
//     parentPort.postMessage({ counter })
//   }
// }
