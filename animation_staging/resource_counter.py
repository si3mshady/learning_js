import json
import boto3


def get_ec2_count():
    ec2 = boto3.client('ec2')
    return  len(ec2.describe_instances()['Reservations'])

def get_lambda_count():
    lambs = boto3.client('lambda')
    return len(lambs.list_functions()['Functions'])

def get_rds_instance_count():
     rds = boto3.client('rds')
     return len(rds.describe_db_instances()['DBInstances'])

def create_data_dictionary():
    data = {}
    data['EC2'] = get_ec2_count()
    data['Lambda'] = get_lambda_count()
    data['RDS'] = get_rds_instance_count()
    return data




def lambda_handler(event, context):
    data = create_data_dictionary()
    return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' },
            'body': data,
                "isBase64Encoded": False
            
        }
