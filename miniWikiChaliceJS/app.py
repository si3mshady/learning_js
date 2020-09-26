from chalice import Chalice, CORSConfig
import boto3, json

app = Chalice(app_name='miniwiki-project-api')
cors_config = CORSConfig(allow_origin='*')

def filterTable(keyword,dynamoResultSet):
    filtered = [item for item in dynamoResultSet['Items'] if item['keyword']['S'] == keyword]  
    return list({data['url']['S']:data['keyword']['S'] for data in filtered}.keys())
    #TypeError: Object of type dict_keys is not JSON serializable unless list() is used 
    #the key value of dict comprehension needs to be url because it's unique 
    #otherwise the key would be overwritten (key values should have high-cardinality)

def scanAndFilterTable(key):
    dynamoClient = boto3.client('dynamodb',region_name='us-east-1')
    dynamoResultSet =  dynamoClient.scan(TableName='Miniwiki')  
    return filterTable(key,dynamoResultSet)
    

#databses usese composite primary key because multiple values could be stored under the same keyword 
def addDocument(keyword,url):   
    dynamoResource = boto3.resource('dynamodb',region_name='us-east-1')
    miniWikiTable = dynamoResource.Table('Miniwiki')     
    miniWikiTable.put_item(Item={str('keyword'): str(keyword), str('url'): str(url)})


@app.route('/addToDatabse/{data}', methods=['POST'],cors=cors_config, content_types=['application/json'])
def addToDatabase(data):
    fullBody = app.current_request.json_body
    searchKey = fullBody['key']
    searchUrl = str(fullBody['link'])
    addDocument(searchKey,searchUrl)
    print(fullBody)
    return {"searchKey-added": searchKey, 
    "searchUrl-added": searchUrl }


@app.route('/searchQuery/{data}', methods=['POST'],cors=cors_config, content_types=['application/json'])
def searchQuery(data):
    requestData = app.current_request.json_body
    tableScanData = scanAndFilterTable(requestData['key'])
    print(tableScanData)
    return {"success": tableScanData}

#AWS Chalice Python3 VanillaJS Jquery 
#Create a small wiki-website to help keep track of usefull links I come across 
#Elliott Arnold 9-26-20 DMS DFW Covid-19
# curl -H "Content-Type: application/json" -X POST -d '{"hello": "world"}' <endpoint_url>
#https://www.youtube.com/watch?v=M5QY2_8704o&list=PLrVQaveCtQdZavMBJ5lhSr88l-TZs904s&index=27