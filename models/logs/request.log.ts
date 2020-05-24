import { BaseLog } from "./base.log";

export class RequestLog extends BaseLog {
    requestType: string;
    body: any;
    type = "request-log";
}