var express = require('express');
var router = express.Router();
const { Worker } = require('worker_threads')

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./service.js', { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}

router.get('/', function (req, res, next) {
  const firstArray = Array.from({ length: 2000000 }).map((x, i) => 'hello world' + i).concat(['my frienda']);
  const secondArray = Array.from({ length: 2000000 }).map((x, i) => 'my friend' + i).concat('hello world1');
  console.log('start intensive task');
  runService({ firstArray, secondArray }).then((result) => {
    res.json({ result })
  }).catch(err => console.error(err))
});

module.exports = router;
