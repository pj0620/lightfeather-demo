const cors = require('cors')
const express = require('express')
const axios = require('axios')

const app = new express()

app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  var oneof = false;
  if(req.headers.origin) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      oneof = true;
  }
  if(req.headers['access-control-request-method']) {
      res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
      oneof = true;
  }
  if(req.headers['access-control-request-headers']) {
      res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
      oneof = true;
  }
  if(oneof) {
      res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }

  // intercept OPTIONS method
  if (oneof && req.method == 'OPTIONS') {
      res.send(200);
  }
  else {
      next();
  }
});

app.get('/api/supervisors', async (req, res, next) => {
  const supervisorResp = await axios.get('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers')
    .catch(e => {
      console.error('error >> ', e);
      return null;
    });
  if (!supervisorResp) {
    return;
  }

  const compare = (a,b) => {
    if (a > b) 
      return 1;
    else if (a === b) 
      return 0;
    else 
      return -1;
  };
  const supervisorsSorted = supervisorResp.data.sort((a,b) => 
    compare(a.jurisdiction, b.jurisdiction) ||
    compare(a.lastName, b.lastName) ||
    compare(a.firstName, b.firstName)
  );
  supervisorsSorted.forEach(s => 
    console.log(`${s.jurisdiction} - ${s.lastName}, ${s.firstName}`)  
  );
  res.send(supervisorsSorted); 
})

app.post('/api/submit', async (req, res) => {
  const requiredFields = ['firstName', 'lastName', 'email'];
  const missingFields = requiredFields.filter(f => !req.body[f]);
  if (missingFields.length > 0) {
    res.status(422).send(`missing required fields: ${missingFields}`);
    return;
  }
  console.log(req.body);
  res.send(req.body);
})

app.listen(3000, () => { 
    console.log('Listening on 3000. Ctrl+c to stop this server.')
});