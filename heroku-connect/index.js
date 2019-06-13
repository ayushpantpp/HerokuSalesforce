//just for static testing
const herokuConnect = require('../db/heroku-connect');
const axios = require('axios');
var sf = require('node-salesforce');
var conn = new sf.Connection({
  loginUrl: 'https://ap15.salesforce.com'
});

const username = 'ayushpant@nuclaysolutions.com';
const password = 'ilove3110OhWramGzVlNTtms7iQkHeWfhH';
conn.login(username, password, function (err, userInfo) {
  if (err) { 
    return console.error(err); 
  }
  // console.log(conn.accessToken);
  var records = [];
  conn.query("SELECT Id, Name FROM Contact", function (err, result) {
    if (err) { 
      return console.error(err); 
    }
    //console.log(result);
  });
  
  axios.get('https://ap15.salesforce.com/services/data/v39.0/sobjects/Contact/0032v00002jgidpAAA',
    { headers: { Authorization: 'Bearer 00D2v0000012YVk!AQEAQK2mX_Sh7T7aWzJe22RlGu9ESDVry23Qm.3nzs4.vMYbBQoH2ZTloKy1qeYBYHQFBhgPmJUwjrf_2EBoENxsj0AgCb6e' } })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    }).finally(function () {
      // always executed
      console.log('CHuti')
    });
});



(async () => {
  const { rows } = await herokuConnect.query('SELECT * from salesforce2.link')
  await herokuConnect.end()
  console.log(rows)
})().catch(e => setImmediate(() => { throw e }))

