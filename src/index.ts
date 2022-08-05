import dotenv from 'dotenv';
dotenv.config();
import { Mail } from "./mail.interface";
import { Queue } from "bullmq";

const queue = new Queue<Mail>(process.env.QUEUE_NAME!, {
  connection: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!)},
});

//const args = process.argv.slice(2);

//console.log(args);

(async () => {
  await queue.add("sendMail", {
    from: process.env.FROM,
    to: process.env.TO,
    subject: process.env.SUBJECT,
    text: process.env.TEXT,
  });

  console.log(`Enqueued an email sending to ` + process.env.TO);

  // Exit for the next test run
  //process.exit(0);
})();
