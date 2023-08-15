#Lambda4: subscribe for notification

import json
import boto3

sns_client = boto3.client("sns")

def lambda_handler(event, context):
  
  if(event is not None):
      response = sns_client.subscribe(
                  TopicArn='arn:aws:sns:us-east-1:647765930477:recipeSNSTopic',
                  Protocol='email',
                  Endpoint=event['email']
              )

      return {
          'statusCode': 200,
          'body': json.dumps('Hello from Lambda!')
      }
  else:
      return {
          'statusCode': 415,
          'body': json.dumps('Invalid Input from the frontend')
      }