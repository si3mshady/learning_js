import boto3

ec2 = boto3.client('ec2')

def lambda_handler(event,context):  
        instance_ids = get_instance_ids()
        return {
            'statusCode': 200,
            'body': list(instance_ids)
        }

def get_instance_ids():
    return [ insta_id['Instances'][0]['InstanceId'] \
         for insta_id in  ec2.describe_instances()['Reservations']]


#AWS Apigateway Lambda Python React Components EC2 Event Listener practice 
#List Instance Id's, which event listener click element in DOM to fetch metadata about instance 
#React JS -> API Gateway -> Lambda -> Python 
#Elliott Arnold -  7-14-20  - Learning JS 