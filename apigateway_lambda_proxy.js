const axios = require('axios');

exports.handler = async (event) => {
   
        if (event.resource === '/{proxy+}') {
            
        const path = event.requestContext.path        
        
        if (event.httpMethod === 'GET' & path.includes('v1') ){
            return sendRequest('v1')
            
        } else if (event.httpMethod === 'GET' & path.includes('v2') ) {
            return sendRequest('v2')
    }}

    
}


async function sendRequest(version) {
   
    if (version === 'v1') {
        const endpoint = "http://ec2-86-75-30-9.compute-1.amazonaws.com"
        const data = await axios.get(endpoint)
        const api_response = data.data
        const statusCode = data.statusCode
        return  {'statusCode': statusCode , 'body': api_response}   
        
        
    } else if (version === 'v2') {
        const endpoint = "http://ec2-9-30-75-86.compute-1.amazonaws.com"
        const data = await axios.get(endpoint)        
        const api_response = data.data
        const statusCode = data.statusCode
        return  {'statusCode': statusCode , 'body': api_response}   
        
    }   
   
}

/*
AWS API-Gateway Proxy integration - Exercise 
Access multiple api backends using api gateway + lambda 
Elliott Lamar Arnold 6-25-20 
Learning JS 
DMS DFW PY JS  
*/

