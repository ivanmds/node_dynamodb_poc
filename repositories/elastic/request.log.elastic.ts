import { BaseElastic } from "./base.elastic";
import { RequestLog } from "../../models/logs/request.log";

export class LogsElastic extends BaseElastic<RequestLog> {

    private static _logsElastic: LogsElastic = null;

    constructor() {
        super('logs');
    }

    public static Create(): LogsElastic {

        if(LogsElastic._logsElastic == null) {
            LogsElastic._logsElastic = new LogsElastic();
        }

        return LogsElastic._logsElastic;
    }
}

