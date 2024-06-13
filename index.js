require('dotenv').config();
const express = require('express');

const app = express();
const port = 8000;
const summarizeText = require('./summarize.js');
const path = require('path')

// Parses JSON bodies (as sent by API clients)
app.use(express.json());



app.use(express.static(path.join(__dirname, 'public')));

// Serve the homepage or a default response for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Serves static files from the 'public' directory
app.use(express.static('public'));

app.post('/summarize', (req, res) => {
  // get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;

  // call your summarizeText function, passing in the text from the request
  summarizeText(text)
    .then(response => {
      res.send(response); // Send the summary text as a response to the client
    })
    .catch(error => {
      console.log(error.message);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
