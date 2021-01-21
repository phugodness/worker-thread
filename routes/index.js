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
  const array = Array.from({ length: 10000000 }).map(() => 'hello world').map((x) => x + 'aaaa');
  console.log('start intensive task');
  runService(array).then((result) => {
    res.json({ result })
  }).catch(err => console.error(err))
});

module.exports = router;
