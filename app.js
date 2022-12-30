const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const {response} = require('express');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = 'https://us21.api.mailchimp.com/3.0/lists/f7e326b716';
  const options = {
    method: 'POST',
    auth: 'bidhan:c59e4e15a63357c09384c9d534864991-us21',
  };

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }

    // response.on('data', (data) => {
    //   console.log(JSON.parse(data));
    // });
  });
  request.write(jsonData);
  request.end();
});

app.post('/failure', (req, res) => {
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('The server is started at port 3000');
});

// c59e4e15a63357c09384c9d534864991-us21

// f7e326b716
