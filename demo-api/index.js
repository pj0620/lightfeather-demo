const express = require('express')
const axios = require('axios')

const app = new express()
app.use(express.json())

app.get('/api/supervisors', async (req, res) => {
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
})