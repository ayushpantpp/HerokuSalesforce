const axios = require('axios');
var sf = require('node-salesforce');
var express = require('express');
var router = express.Router();

var conn = new sf.Connection({
  loginUrl: 'https://ap15.salesforce.com'
});


router.get('/getContactDetails', async function (req, res) {
  const username = 'ayushpant@nuclaysolutions.com';
  const password = 'ilove3110OhWramGzVlNTtms7iQkHeWfhH';
  conn.login(username, password, async function (err, userInfo) {
    if (err) {
      res.status(400).json({ err });
    }
    var records = [];
    await conn.query("SELECT Id, Name FROM Contact", function (err, result) {
      if (err) {
        res.status(400).json({ err });
      }
      const value = result.records[0].Id;
      axios.get('https://ap15.salesforce.com/services/data/v39.0/sobjects/Contact/' + value,
        { headers: { Authorization: 'Bearer ' + conn.accessToken } })
        .then(function (response) {
          res.status(200).send(response.data);
        })
        .catch(function (error) {
          res.status(400).send({ "Message": "No data found" });
        }).finally(function () {
          res.status(403).send({ "Message": "No data found" });
        });
    });
  });
});


module.exports = router;

