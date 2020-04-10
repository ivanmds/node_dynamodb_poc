import * as restify from 'restify';
import { environment } from '../common/environment';

export class Server {

    application: restify.Server;

    initRoutes(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                this.application = restify.createServer({
                    name: 'poc_dynamo',
                    version: '1.0.0'
                });

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
    };

    bootstrap(): Promise<Server> {
        return this.initRoutes().then(() => this);
    };
}