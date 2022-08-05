"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bullmq_1 = require("bullmq");
const queue = new bullmq_1.Queue(process.env.QUEUE_NAME, {
    connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
    },
});
//const args = process.argv.slice(2);
//console.log(args);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield queue.add("sendMail", {
        from: process.env.FROM,
        to: process.env.TO,
        subject: process.env.SUBJECT,
        text: process.env.TEXT,
    });
    console.log(`Enqueued an email sending to ` + process.env.TO);
    // Exit for the next test run
    //process.exit(0);
}))();
//# sourceMappingURL=index.js.map