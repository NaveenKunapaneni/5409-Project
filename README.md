**CSCI 5409 SEC – 2 ADV TOPICS IN CLOUD COMPUTING
TERM PROJECT
BY
NAVEEN KUNAPANENI – B00930132 Nv676973@dal.ca**
 
**Services Selected:
Compute: selected (2)
1. AWS ECS (Elastic container Service):
2. AWS Lambda:**
As I want to work more on code rather than the infrastructure, I choose serverless architecture. I have containerized my application and pushed it docker hub. As I choose containerization of my application which also help in hosting my application other cloud providers hassle free by just pulling the image form the docker hub. With ECS I run my containerized application and deploy, manage, scale it which is the reason I choose this over other services, in EC2 I must manage the infrastructure, such as patching, scaling, and monitoring which is time consuming.

**Storage: selected (1)
1. Dynamo DB:**
DynamoDB is a fully managed NoSQL database which can scale up and down based on my application requirements. As I am using AWS services like AWS Lambda and API Gateway, I choose dynamo dB which integrates well and suits my serverless architecture agenda. Dynamo dB is cost-effective than other managed databases because it is pay for the read and write capacity, and the storage consumption.

**Network: selected (1)
1. API Gateway**
I have deployed my front-end using AWS ECS and the backend is using lambda as a personal preference I think api gateway works well between ECS and lambda than other services like cloud front, event bridge, VPC.

**General: selected (2)
1. SQS 2. SNS**
In my application I must send notification to the users whenever there is a new recipe is added, for these I need a messaging service in aws. So, I choose SQS which is subscribed to an SNS topic. The SQS is used to trigger a lambda which then calls the SNS topic to publish the message as soon as any recipe added. I couldn’t find any alternative for these, so I choose these 2 technologies.
  
**Deployment Model:**
As for the deployment model I have used public cloud. The reason for this approach was the application doesn’t need any fancy encryption and data security apart from the user’s data which will managed when login system was introduced. As per my understanding the users can bear the slightest delay when loading the application as the application is just about the recipes. The availability and reliability of public cloud would be more than enough for the application and its purposes. Considering the application usages and its benefits to the end user I believe that public cloud would save lot of work, maintenance, man power, money and time.

**Delivery model:**
Based on the AWS services (ECS, lambda, Dynamo DB, SQS, SNS, Api gateway) I guess it is a combination of PaaS and SaaS. My application is providing a service to the user which is the reason I have chosen SaaS. The reason I have choose PaaS is have used lambda, dynamo db and ECS which are platform as a service. The serverless architecture that I am aiming for has derived me to this combination.
  
**Final Architecture:**
 The front-end which react is web app is hosted on the ECS container. When the user interacts with the front-end like see recipes, submit a form for addition of new recipes, subscribe to our mailing list, ECS sends the request to the API gateway. The api gateway send the request based on the type of request. If its submission of a form, then it invokes a apiLambda which writes into a dynamo db and invokes a sqs queue. The sqs queue will invoke a snsLambdaTrigger which is used to publish a message form a sns topic stating that a new recipe is added and all the users unser the sns topic gets a mail. The sns topic which send the mail is the mailing list. If the users access the application, then it gets the data form the db and displays in the front end which is taken care of another getReipeLambda. When a new user wants to join a mailing list then the user submits an email id which is sent to a subscribeLambda which adds the user to the sns topic.
I have stored all the data inside dynamodb.
  
I have used python-based lambda runner which has all the code for the back end. For the front end I have used java script and react js.
I have deployed my whole backend and mailing system using cloud formation. Only the front- end is deployed separately inside a container.
I guess my application matches microservices architecture solely because apart from one two thing all the features work individually in the backend. I guess using many lambdas will eventually jeopardize the application as costs more in the long run when the application scale. The lambdas costs may exceed the application revenue.

**Security:**
As for security, my application is vulnerable as it is hosted via unsecured protocol. But all the calls from the front-end use https and hit the api gateway. In a way my application is protected internally. I don’t know could be someone eavesdropping my traffic. Also, the security groups for the ECS instance are open anyone from anywhere can connect to the container which is major concern.

**Cost Analysis:**
The server racks, compute power will be less for my application. But even though less compute power is needed the infrastructure is not cheap it would cost around 100k CAD for the servers, considering the application is success and deployed on a global level. Even for a private cloud which is these small needs one room with ventilation, coolers, maintenance, electricity, cleaning. I guess it would costs more than 150k CAD upfront for the setup and 5k CAD more for the maintenance every month.
Cloud Mechanism to not escalate unexpectedly:
Use AWS Cost Explorer and AWS budget to track the usage, forecast costs, receive budget alerts. I have used Dynamo db and ECS and lambda which occupy major expenses. I will enable cloud watch logs to dynamo db to monitor the no of read and writes into db, set alert to monitor suspicious events. Track the lambda via cloud watch logs to tackle scenarios like if the lambda went into loop and runs forever.
New Features:
I implement login feature and allow people who has account can modify, upload new recipes, like recipes, share recipes, download them. To implement this, I need AWS Cognito to manage user management, S3 bucket, I will store the recipes in a s3 bucket and display a downloadable link for the users to download. Furthermore, add an event bridge which will trigger once in 5 days to clean the empty data in dynamo db or s3.
  
