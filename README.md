
# Email Service API

This project is used to test our emailing microservice project by passing our payload and the microservice will send emails.

# Prerequisites

NodeJS
typeScript
redis
bullMQ
dotenv
express
Postman (To send payload to the microservice and check the response)

Install Redis on local environment, please follow below link.
https://redis.io/docs/getting-started/

To Install BullMQ and redis, run below command
npm i bullmq
npm i ioredis

To Install typescript, run below command
npm i --save-dev typescript
npm i --save-dev @types/node

To Install express, run below command
npm i --save-dev express

# Run and test microservice

First execute project by running below command.

npm start

After that check microservice using below scripts in Postman:

Reuqest: POST
EndPoint: localhost:8001/api/sendEmail
Payload: in JSON format.
    {
    "from": "username@domain.com",
    "to" : "username@domain.com",
    "subject": "API Test email",
    "text": "Test Email from NodeJS Web API"
    }

# Test request to send email using POSTMAN

Now, open Postman and send payload by using POST request as shown in figure1.0.jpg (Figure1.0.jpg exist in the same folder)

