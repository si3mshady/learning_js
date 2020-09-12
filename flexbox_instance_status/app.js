const containerHandler = document.querySelector('.container')

const populate_div = (instance_id,status) => {
        var newDiv = document.createElement('div')        
        newDiv.innerHTML += `<div class='tiles ${status}'>  <p> ${instance_id} </p> </div>`    
        containerHandler.appendChild(newDiv)
}

const clear_div = () => {
    let allTiles = document.querySelectorAll('.tiles')
    return allTiles
}

// function runs every 10 seconds 
setInterval(() => {
    
    fetch("https://06xluu9pu2.execute-api.us-east-1.amazonaws.com/testing/instances")
    .then(res => {
    /* produces a chain of promises so I need to extract them out
    the first "then" is needed to expose the json message body - res.json()  */ 
    console.log( res.json()    
    .then(res => {
        // subsequent "then" use the output of previous "then" statement              
        let mapping_data  = res
        let keys = Object.keys(mapping_data)   // get keys      
        let length = keys.length             

        for (let i = 0; i < length; i++ ) {
            const MAX_INSTANCES = length
            populate_div(keys[i], mapping_data[keys[i]].Name)
        }}   
     ).then(res => { 
         /* remove the child divs to clear the screen - refresh 
            use settimeout to allow 9 seconds before clearing the screen */
        setTimeout(() => {
            let elements  = clear_div() 
         for (let i = 0; i <= elements.length; i++ ) {                      
          elements[i].remove()
          
         }}, 9000);        
    
    }));
});


},  10000);

 /* AWS Lambda EC2 (rookie) Vanilla JS CSS Python practice exercise
Create flexbox container that depicts all EC2 instances from account 
create API (API Gateway) with Lambda Integration that returns instance id & status
Update CSS class such that depending on instance status green = 'running  red = 'stopped' terminated = 'not visible' 
Elliott Arnold - 9-12-20  DMS DFW Covid19   
*/

