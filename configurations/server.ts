import * as restify from 'restify';
import { environment } from '../common/environment';
import { Router } from '../common/router';
import { LogsElastic } from '../repositories/elastic/request.log.elastic';
import { RequestLog } from '../models/logs/request.log';

export class Server {

    private static _application: restify.Server = null;
    application: restify.Server = null;

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                this.application = Server.GetApplication();

                this.application = restify.createServer({
                    name: 'poc_dynamo',
                    version: '1.0.0'
                });

                this.application.use(restify.plugins.bodyParser());
                this.application.use(restify.plugins.queryParser());

                this.application.use(function (req, res, next) {

                    let requestData: any = null;

                    if (req) {
                        requestData = {
                            url: req.url,
                            headers: req.headers,
                            params: req.params,
                            body: req.body,
                            type: 'request'
                        };
                    } else {
                        requestData = {
                            body: JSON.stringify(res.json),
                            headers: res.getHeaders(),
                            type: 'response'
                        };
                    }

                    let requestLog = new RequestLog();
                    requestLog.id = (new Date()).toUTCString();
                    requestLog.body = requestData;
                    requestLog.requestType = 'test';

                    LogsElastic.Create().put(requestLog);
                    return next();
                });

                for (let router of routers) {
                    router.applyRoutes(this.application);
                }

                this.application.get('/hello', (req, resp, next) => {
                    resp.send({ message: 'hello' });
                    return next();
                });

                this.application.listen(environment.server.port, () => {
                    resolve(this.application);
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initRoutes(routers).then(() => this);
    }

    public static GetApplication(): restify.Server {

        if (Server._application == null) {
            Server._application = restify.createServer({
                name: 'poc_dynamo',
                version: '1.0.0'
            });
        }

        return Server._application;
    }
}