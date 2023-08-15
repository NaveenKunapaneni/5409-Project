#Lambda3: subscribe lambda

import json
import boto3
import uuid
from datetime import date
import time

sqs_client = boto3.client('sqs')
# sns_client = boto3.client('sns')
db_client = boto3.client('dynamodb')


def lambda_handler(event, context):
    id = str(uuid.uuid4())
    print(uuid)
    if(event is not None):
        response = db_client.put_item(
            TableName = "cloudTermDB",
            Item = {
                'uuid': {'S': get_uuid() },
                'firstName': {'S': event['firstName']},
                'lastName': {'S': event['lastName']},
                'email': {'S': event['email']},
                'recipeName': {'S': event['recipeName']},
                'recipeDescription': {'S': event['recipeDescription']},
                'timestamp':{'S': str(get_date())}
                }
            )
            
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            sqs_client.send_message(
                        QueueUrl='https://sqs.us-east-1.amazonaws.com/647765930477/recipeSQS',
                        MessageBody='A new Recipe is added Please check the Website',
                        DelaySeconds=15,
                    )
            return {
                'statusCode': 200,
                'body': 'Item added to DynamoDB'
            }
        else:
            return {
                'statusCode': 500,
                'body': 'Error adding item'
            }
        
        

def get_uuid():
    id = str(uuid.uuid4())
    print(uuid)
    return id;
    
def get_date():
    today = date.today() 
    today_date = today.isoformat()
    print(today_date)
    return today_date