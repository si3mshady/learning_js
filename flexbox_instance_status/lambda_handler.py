import boto3, json

def create_mappings():
    ec2 = boto3.client('ec2')
    return { i['Instances'][0]['InstanceId']:i['Instances'][0]['State'] \
         for i in ec2.describe_instances()['Reservations']}

def lambda_handler(event,context):
    return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' },
            'body': json.dumps(create_mappings()),
                "isBase64Encoded": False
            
        }


    


#AWS Lambda EC2 (rookie) Vanilla JS CSS Python practice exercise
#Create flexbox container that depicts all EC2 instances from account 
#create API (API Gateway) with Lambda Integration that returns instance id & status
#Update CSS class such that depending on instance status green = 'running  red = 'stopped' terminated = 'not visible' 
#Elliott Arnold - 9-12-20  DMS DFW Covid19   
