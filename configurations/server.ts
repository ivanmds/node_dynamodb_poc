import * as restify from 'restify';
import { environment } from '../common/environment';
import { Router } from '../common/router';

export class Server {

    application: restify.Server;

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                this.application = restify.createServer({
                    name: 'poc_dynamo',
                    version: '1.0.0'
                });
               
                this.application.use(restify.plugins.bodyParser());
                this.application.use(restify.plugins.queryParser());

                this.application.use(function(req, res, next) {
                    console.log({
                        url: req.url,
                        headers: req.headers,
                        params: req.params,
                        body: req.body
                    });

                    console.log({
                        statusCode: res.statusCode
                    });

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
}