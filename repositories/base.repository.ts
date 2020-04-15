import AWS from 'aws-sdk';
import { environment } from '../common/environment';

export abstract class BaseRepository<TEntity> {

    protected docClient: AWS.DynamoDB.DocumentClient;

    constructor() {
        AWS.config.update(environment.database);
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    public put(data: TEntity): void {

        let params = {
            TableName: environment.database.tablename,
            Item: data
        };

        this.docClient.put(params);
    }
}