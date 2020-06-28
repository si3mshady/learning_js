const rp = require('request-promise');
const axios = require('axios')
const http = require('http');
const express = require('express');
const fs = require('fs');
const { brotliDecompress } = require('zlib');
const app = express();
const  bodyparser = require('body-parser')
const { request } = require('express');

class ThisNode {
    constructor() {
        this.public_ipv4 = process.env.NODE_URL         
        this.networkNodes = []              
      
    }
    async register(new_node_url) {                  
        //register updates the nodelist with new instance only 
        this.networkNodes.push(new_node_url)       
    }
    async broadcast_to_network(new_node_url) {
        const promise_options_bucket = []
        // in the loop set promise_options and load into promise_options_bucket... array
        this.networkNodes.forEach(network_node => {
            var promise_options = {
                method: 'POST',
                uri: `http://${network_node}:8080/register`,
                body: {
                    new_node: new_node_url
                },
                json: true // Automatically stringifies the body to JSON
            };
            //loads all async promises 
            promise_options_bucket.push(promise_options)
        });

        Promise.all(promise_options_bucket).then(data => {
            console.log(`New node url ${new_node_url}`)            
            const bulkPromiseOptions = {
                uri: `http://${new_node_url}:8080/register_all_nodes_to_new_node`,
                method: 'POST',            
                body: { allNetworkNodes: [...this.networkNodes,this.currentNodeUrl]},
                json: true                
            };
            return rp(bulkPromiseOptions);
        })                     
        .then((results) => {
            console.log('pass!')
        })
        .catch((err) => {
            console.log(err)
        })

    }
}
    
const node = new ThisNode()
console.log(node)
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))

app.post('/register_broadcast',(req,res) => {                
    console.log(node)    
    
    const new_node_url = req.body.new_node_url    
    node.register(new_node_url)    
    node.broadcast_to_network(new_node_url)
    console.log('Registered and broadcast')     
    res.send('Registered and broadcast')  // then push somthing to the new node   
})  

app.post('/register',(req,res) => {    
    console.log('This is node ',node.public_ipv4)      
    console.log('/register endpoint hit')
    console.log(req)       
    node.networkNodes.push(new_node)     
})

app.post('/register_all_nodes_to_new_node',(req,res) => {
    console.log(req.body.allNetworkNodes)
    node.networkNodes.push(req.body.allNetworkNodes)   
})

const server = http.createServer(app)
server.listen(8080,() => { 
    const nodeUrl =  process.env.NODE_URL
    console.log('listening on port 8080',nodeUrl)
});

/*
AWS EC2 Javacript Blockchain Decentralized Network practice 
Practice registering, broadcasting and adding instances to decentralized node network 
Late night toil, buring the midnight oil 
Elliott Lamar Arnold 6-28-20
DMS DFW PY JS
*/