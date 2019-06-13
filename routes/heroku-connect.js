var express = require('express');
var router = express.Router();
const herokuConnect = require('../db/heroku-connect');
var sf = require('node-salesforce');


router.post('/dataToHeroku', async function (req, res) {
  const query = 'INSERT INTO salesforce2.link(url,name, description, rel) VALUES($1,$2,$3,$4) RETURNING *';
  const values = [req.body.url, req.body.name, req.body.description, req.body.rel];
  await herokuConnect.query(query, values, (error, result) => {
    if (error) {
      res.status(400).json({ error });
    }
    res.status(202).send({
      status: 'Successful',
      result: result.rows[0],
    });
  });  
})

router.get('/dataFromHeroku', async function (req, res) {
  const query = 'SELECT * FROM salesforce2.link';
  await herokuConnect.query(query, (error, result) => {
    if (error) {
      res.status(400).json({ error });
    }
    res.status(202).send({
      status: 'Successful',
      result: result.rows,
    });
  });
})

module.exports = router;
