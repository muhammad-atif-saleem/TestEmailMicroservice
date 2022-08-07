"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bullmq_1 = require("bullmq");
const queue = new bullmq_1.Queue(process.env.QUEUE_NAME, {
    connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
    },
});
//READ Request Handlers
app.get('/', (req, res) => {
    res.send('Welcome to REST API with Node.js and TypeScript!');
});
//CREATE Request Handler
app.post('/api/sendEmail', (req, res) => {
    const { error } = (req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const mail = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };
    AddQueue(mail);
    res.send(mail);
});
function AddQueue(mail) {
    queue.add("sendMail", {
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
    });
    console.log(`Enqueued an email sending to ` + mail.to);
}
;
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
//# sourceMappingURL=main.js.map