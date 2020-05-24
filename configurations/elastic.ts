import { LogsElastic } from "../repositories/elastic/request.log.elastic";

export class ElasticConfig {

    init(): Promise<any> {

        return new Promise<any>((resolver, reject) => {
            try {
                LogsElastic.Create();
                
                resolver();
            } catch (err) {
                reject();
            }
        });
    }

}