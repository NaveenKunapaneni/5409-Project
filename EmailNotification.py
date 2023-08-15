#Lambda1: Email Notifier

import json
import boto3

sns_client = boto3.client("sns")

def lambda_handler(event, context):
    
    response = sns_client.publish(
    TopicArn='arn:aws:sns:us-east-1:647765930477:recipeSNSTopic',
    Message='A new recipe has been added, please check the new recipe.',
    Subject='New recipe Alert'
    )
    
    print(response)
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
