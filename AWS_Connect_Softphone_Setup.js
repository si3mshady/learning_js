<!DOCTYPE html>
<meta charset="UTF-8">
<html>
  <head>
    <script type="text/javascript" src="amazon-connect-1.4.js"></script>
  </head>
  <!-- Add the call to init() as an onload so it will only run once the page is loaded -->
  <body onload="init()">
    <div id="containerDiv" style="width: 400px;height: 800px;"></div>
    <script type="text/javascript">
      var instanceURL = "https://<instance-name>.awsapps.com/connect/ccp";

      // initialize the streams api
      function init() {
        // initialize the ccp
        connect.core.initCCP(containerDiv, {
          ccpUrl: instanceURL,            // REQUIRED
          loginPopup: true,               // optional, defaults to `true`
          loginPopupAutoClose: true,      // optional, defaults to `true`
          loginOptions: {                 // optional, if provided opens login in new window
            autoClose: true,              // optional, defaults to `false`
            height: 600,                  // optional, defaults to 578
            width: 400,                   // optional, defaults to 433
            top: 0,                       // optional, defaults to 0
            left: 0                       // optional, defaults to 0
          },
          region: "eu-central-1",         // REQUIRED for `CHAT`, optional otherwise
          softphone: {                    // optional
            allowFcpramedSoftphone: true,   // optional
            disableRingtone: false,       // optional
            ringtoneUrl: "./ringtone.mp3" // optional
           }           
         });         
  
         setSubscriptionsOnAgentConnect()
         onConnection()

      }

      function setSubscriptionsOnAgentConnect() {
       connect.agent(function(agent) {       
        checkAgentIsConnected(agent)           
        checkAgentStateChange(agent)      
    }); 
    }
    
    function checkAgentStateChange(agent) {
        agent.onStateChange(function(agentStateChange) { 
        console.log('State change detected!');        
        console.log('Previous State =',agentStateChange.oldState)
        console.log('Current State =',agentStateChange.newState)
        console.log(`Current duration of state ${agentStateChange.newState} =`, checkAgentStateDuration(agent))       
    })}

    // 'agent' methdods can only be called from methods that expect 'agent' arguments 
    function checkAgentIsConnected(agent) { console.log('Agent is connected', agent);  } 
    function onConnection () { connect.contact(function(contact) { console.log('this is the contact',contact) })}
    function checkAgentStateDuration (agent) { return agent.getStateDuration() / 1000 }

    </script>
  </body>
  <script src="./amazon-connect-1.5.1-2-g1037b86.js"></script>
</html>

<!-- AWS Streams API Practice-->
<!-- Learning to customize AWS Streams Soft Phone  -->
<!-- Elliott Arnold 11-11-20 AWS DMS Veterans Navy  -->

