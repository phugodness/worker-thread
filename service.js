const { workerData, parentPort, isMainThread } = require('worker_threads');
const { isOverlapArray } = require('./overlap');

if (!isMainThread) {
  const { biggerArray, smallerArray } = workerData;
  if (!Array.isArray(biggerArray) || !Array.isArray(smallerArray)) {
    throw new Error('Not arrays');
  }

  parentPort.postMessage(isOverlapArray(biggerArray, smallerArray));
}

