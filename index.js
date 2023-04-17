const express = require('express')
const app = express()
const port = 3000


app.get('/genitive', async (req, res) => {
    const input = {
        gender: req.gender,
        givenName: req.givenName,
        patronymicName: req.patronymicName,
        familyName: req.familyName
      };
    
      const output = await shevchenko.inVocative(input);
      res.send(output)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})