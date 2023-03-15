const axios = require("axios");

const options = {
  method: 'POST',
  url: 'https://temp-mail44.p.rapidapi.com/api/v3/email/new',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '9c6a457b42msh443c1ac83478e9ep16ee9fjsn3cefdfdf0728',
    'X-RapidAPI-Host': 'temp-mail44.p.rapidapi.com'
  },
  data: '{"key1":"value","key2":"value"}'
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});