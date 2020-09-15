import boto3, json

ec2 = boto3.client('ec2')



def getRegions():    
    return  [region['RegionName'] for region in ec2.describe_regions()['Regions']]
    
def assess_all_instances():
    main_array = []
    for region in getRegions():
        ec2 = boto3.client('ec2',region_name=region)
        instances = ec2.describe_instances()
        for i in instances["Reservations"]:
           main_array.append({"region": region,"state":i['Instances'][0]['State'], "instance_id":i['Instances'][0]['InstanceId']})
           
    
        
    return {"data":main_array}

def lambda_handler(event,context):
    return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' },
            'body': json.dumps(assess_all_instances()),
                "isBase64Encoded": False
            
        }


    
