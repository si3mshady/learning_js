import boto3
import json

ec2 = boto3.client('ec2')

def lambda_handler(event,context):
    try:
        if event['instance']:
            instance_id = str(event['instance'])
            data = get_instance_metadata(instance_id)
            return {
                            'statusCode': 200,
                            'headers': {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'  },
                            'body': data ,
                            "isBase64Encoded": False
                        }
    except Exception as e:
            print(e)
            
def get_instance_metadata(instance_id):
    data = ec2.describe_instances(InstanceIds=[instance_id])['Reservations']
    shell = {}
    shell['InstanceId'] = data[0]['Instances'][0]['InstanceId']
    shell['PrivateIpAddress'] = data[0]['Instances'][0]['PrivateIpAddress']
    shell['ImageId'] = data[0]['Instances'][0]['ImageId']
    return shell


#AWS Apigateway Lambda Python React Components EC2 Event Listener practice 
#List Instance Id's, which event listener click element in DOM to fetch metadata about instance 
#React JS -> API Gateway -> Lambda -> Python 
#Elliott Arnold -  7-14-20  - Learning JS 