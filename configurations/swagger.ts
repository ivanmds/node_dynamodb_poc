import { Server } from "./server";

export class SwaggerConfig {

    init(): Promise<any> {
        return new Promise((resolve, reject) => {

            try {
                const app = Server.GetApplication();
                const swaggerUi = require('swagger-ui-restify');
                const swaggerDocument = require('../configurations/swagger.json');

                app.get('/api-docs', swaggerUi.setup(swaggerDocument));

                resolve();
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }
}