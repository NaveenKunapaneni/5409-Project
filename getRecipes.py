#Lambda2: get recipes


import json
import boto3

db_client = boto3.client('dynamodb')

def lambda_handler(event, context):
        
    data = db_client.scan(TableName="cloudTermDB")
    
    return {
        'statusCode': 200,
        'data': data['Items']
    }
