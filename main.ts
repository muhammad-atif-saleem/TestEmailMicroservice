import express from 'express';
const app = express();
app.use(express.json());

import dotenv from 'dotenv';
dotenv.config();
import { Mail } from "./mail.interface";
import { Queue } from "bullmq";


const queue = new Queue<Mail>(process.env.QUEUE_NAME!, {
    connection: {
      host: process.env.REDIS_HOST!,
      port: parseInt(process.env.REDIS_PORT!)},
  });

//READ Request Handlers
app.get('/', (req, res) => {
res.send('Welcome to Email API with Node.js and TypeScript!');
});
 
//CREATE Request Handler
app.post('/api/sendEmail', (req, res)=> {
const { error } = (req.body);
if (error){
res.status(400).send(error.details[0].message)
return;
}
const mail: Mail = {
from: req.body.from,
to: req.body.to,
subject: req.body.subject,
text: req.body.text
};
AddQueue(mail);
res.send(mail);
});
 
function AddQueue(mail: Mail) {
    queue.add("sendMail", {
          from: mail.from,
          to: mail.to,
          subject: mail.subject,
          text: mail.text,
        });
        console.log(`Enqueued an email sending to ` + mail.to);
};

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`Listening on port ${port}...`));