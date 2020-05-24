import elastic from 'elasticsearch';
import { BaseLog } from '../../models/logs/base.log';

export abstract class BaseElastic<TValue extends BaseLog> {
    
    private _client: elastic.Client = null;
    private _indexName: string = null;

    constructor(indexName: string) {
        this._indexName = indexName;

        this._client = new elastic.Client({
            hosts: ['localhost:9200']
        });

        this.init();
    }

    protected Client(): elastic.Client {
        return this._client;
    }

    public put(value: TValue): Promise<any> {
        
        return new Promise<any>((resolver, reject) => {
            let params: elastic.CreateDocumentParams = {
                index: this._indexName,
                type: value.type,
                id: value.id,
                body: value
            };

            this._client.create(params, function (err, resp, status) {
                if(err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    console.log(status);
                    console.log(resp);
                    resolver();
                }
            })
        });
    }

    private init() {
        this._client.indices.create({
            index: this._indexName
        }).then(() => {
            console.log(`success elastic ${this._indexName}`);

            this._client.cluster.health({ index: this._indexName }, (err, res) => {
                if (err) throw err;
                console.log("-- Client Health --", res);
            });
        }).catch((err) => {
            console.log(err, err.stack);
        });
    }
}