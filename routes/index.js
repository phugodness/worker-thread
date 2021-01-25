var express = require('express');
const os = require('os');
var router = express.Router();
const { runService } = require('../worker');

const profiling = () => {
  for (const [key, value] of Object.entries(process.memoryUsage())) {
    console.log(`${key}: ${Math.round(value / 1024 / 1024)} MB`);
  }
}

router.get('/', async (req, res, next) => {
  try {
    console.time('INIT');
    const firstArray = Array.from({ length: 6000000 }).map((x, i) => 'hello world' + i);
    const secondArray = Array.from({ length: 2000000 }).map((x, i) => 'my friend' + i).concat('hello world6000000');
    console.timeEnd('INIT');
    profiling();

    console.time('PROCESS INTENSIVE TASKS');
    let smallerArray = [];
    let biggerArray = [];
    if (firstArray.length < secondArray.length) {
      smallerArray = firstArray;
      biggerArray = secondArray;
    } else {
      smallerArray = secondArray;
      biggerArray = firstArray;
    }

    let results = [];
    let maxIterator = 2000000;
    const cpus = os.cpus().length - 1;
    if (Math.floor(biggerArray.length / maxIterator / cpus)) {
      maxIterator = biggerArray.length / cpus;
    }
    // console.log({ maxIterator, cpus });
    while (biggerArray.length) {
      results.push(runService({ biggerArray: biggerArray.splice(0, maxIterator), smallerArray}))
      // console.log(biggerArray.length);
    }
    const result = (await Promise.all(results)).reduce((acc, cur) => {
      // console.log({cur});
      return acc || cur
    }, false);

    // const result = await runService({ biggerArray, smallerArray });
    console.timeEnd('PROCESS INTENSIVE TASKS');
    profiling();

    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: error.message });
  }
});

module.exports = router;
