

axios.post('localhost:5000/api/', {
    URL: url
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


  axios.post('localhost:5000/api/keyword', {
    URL: url,
    keyword : keyword
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });