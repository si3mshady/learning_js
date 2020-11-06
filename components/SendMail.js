const AWS = require('aws-sdk')
const  secretKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
const  accessKey = process.env.REACT_APP_AWS_ACCESS_KEY_ID

export const sendEmail = (fname,email,datetime) => {
  console.log('Inside Config')


    AWS.config.update({
      accessKeyId: accessKey,
      secretAccessKey: secretKey,       
        region: 'us-east-1'
      });
    
    // const ses = new AWS.SES({ apiVersion: "2010-12-01" });
    const params = {
      Destination: {
        ToAddresses: [`${email}`] // Email address/addresses that you want to send your email
      },
     
      Message: {
        Body: {
          Html: {
            // HTML Format of the email
            Charset: "UTF-8",
            Data:
              `<html><body><h1> Hello  ${fname}c </h1><p style='color:red'>Sample description</p> <p>Scheduled service time ${datetime} </p></body></html>`
          },
          Text: {
            Charset: "UTF-8",
            Data: `Thank you for confirming your service time`
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Test email"
        }
      },
      Source: "alquimista2891@gmail.com"
    };

    var sendEmail = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
    
    // var sendEmail = ses.sendEmail(params).promise();   

   sendEmail
      .then(data => {
        console.log("email submitted to SES", data);
      })
      .catch(error => {
        console.log(error);
      })



}
   
//Learning ReactJS - Basic Web form with AirBnB OpenSource Calendar (React-Dates ) AWS SES 
//Learning ReactJS at AWS 
//Elliott Arnold 11-5-20     WIP   