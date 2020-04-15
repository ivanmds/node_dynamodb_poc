import AWS from 'aws-sdk';
import { environment } from '../common/environment';

export abstract class BaseRepository<TEntity> {

    protected docClient: AWS.DynamoDB.DocumentClient;

    constructor() {
        AWS.config.update(environment.database);
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    public get(id: String): Promise<TEntity> {
        return new Promise<TEntity>((resolver, reject) => {
            var params = {
                TableName: environment.database.tablename,
                Key: {
                    "id": id
                }
            };

            this.docClient.get(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    let result = data.Item as TEntity;
                    resolver(result);
                }
            })
        });
    }

    public put(entity: TEntity): Promise<TEntity> {

        return new Promise((resolver, reject) => {
            let params = {
                TableName: environment.database.tablename,
                Item: entity
            };

            this.docClient.put(params, function (err, data) {
                if (err) reject(err);

                resolver(entity);
            });
        });
    }

    public delete(id: String): Promise<any> {

        return new Promise((resolver, reject) => {

            var params = {
                TableName: environment.database.tablename,
                Key: {
                    "id": id
                }
            };

            this.docClient.delete(params, function(err, data) {
                if(err) reject(err);
                resolver();
            })
        });
    }
}