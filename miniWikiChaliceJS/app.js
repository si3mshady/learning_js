//index.html
const makeUrlString = (basePath) => {
  
  return  `https://6m295ad1if.execute-api.us-east-1.amazonaws.com/api/${basePath}/${Date.now()}`
}

  $('#submit-button').click( () => {    
    var keyword = $('#search-text').val()
    axios.post(makeUrlString('searchQuery'), {key: keyword}).then((response) => {
      var myData = response.data.success
      myData.forEach(element => {
        $('#bundle').append(`<hr><a href="#">${element}</a></hr>`)
      });
      console.log(myData);
    }, (error) => {console.log(error); });
  })
  
// add.html 
  $('#submit-btn').click( () => {
    //take inputs 
    var keyword = $('#keyword').val()
    var url = $('#url').val()
    //clear inputs 
    $('#keyword').val('')
    $('#url').val('')
    
    axios.post(makeUrlString('addToDatabse'), {
      key: keyword, link: url
      
    }).then((response) => {console.log(response);
             
    },(error) => { console.log(error); });
  })







