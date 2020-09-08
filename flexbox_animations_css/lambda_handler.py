import json
import boto3

ec2 = boto3.client('ec2')
iam = boto3.client('iam')

def get_ec2_count():
    return  len(ec2.describe_instances()['Reservations'])

def get_vpc_count():
    return len(ec2.describe_vpcs()['Vpcs'])

def get_sg_count():
     return len(ec2.describe_security_groups()['SecurityGroups'])
     
def get_iam_user_count():
     return len(iam.list_users()['Users'])

def create_data_dictionary():
    data = {}
    data['EC2'] = get_ec2_count()
    data['IAM'] = get_iam_user_count()
    data['VPC'] = get_vpc_count()
    data['SecurityGroups'] = get_sg_count()
    
    return data




def lambda_handler(event, context):
    data = create_data_dictionary()
    return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' },
            'body': json.dumps(data),
                "isBase64Encoded": False
            
        }

