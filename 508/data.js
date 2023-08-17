const express = require('express');
const axios = require('axios');

const app = express();
const port =3000;

app.use(express.json());
app.get('/numbers', async (req, res) => {
  var urls = req.query.url;
console.log(urls);
  if (!urls ) {
    // console.log("yes");
    return res.status(400).json({ error: 'Invalid request format' });
  }
  if (!Array.isArray(urls)) {
    urls = [urls]; 
  }
  var result = [];
  console.log(urls.length);
  for (const url of urls) {
    try {
      const response = await axios.get(url);
      var numbers = response.data.numbers;
    //   console.log(numbers);
      result=result.concat(numbers);
    //   console.log(result);
    } catch (error) {
    //   result[url] = 'Invalid JSON or unable to fetch data';
    
    }
  }
const uniqueArray = [];
  console.log(result);
  for (const item of result) {
    if ( !uniqueArray.includes(item)) {
      uniqueArray.push(Number(item));
    }
  }
  uniqueArray.sort(function(a, b){return a - b});
  console.log(uniqueArray);
  res.json({"numbers":uniqueArray});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});