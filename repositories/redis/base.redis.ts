import redis, { RedisClient } from "redis";
import { BaseModel } from "../../models/base.model";

export abstract class BaseRedis<TValue extends BaseModel> {

    private _client: RedisClient = null;

    constructor(private baseKey: string) {
        this.init();
    }

    public set(value: TValue): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {

            const key = `${this.baseKey}:${value.id}`;
            var jsonValue = JSON.stringify(value);

            this._client.set(key, jsonValue, function (err, reply) {

                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    public get(id: string): Promise<TValue> {
        return new Promise<TValue>((resolve, reject) => {
            const key = `${this.baseKey}:${id}`;
            this._client.get(key, function (err, jsonValue) {
                if(err) {
                    console.log(err);
                    reject(err);
                } else {
                    var objValue = JSON.parse(jsonValue);
                    resolve(objValue);
                }
            });
        });
    }


    private init(): void {
        this._client = redis.createClient();

        this._client.on('connect', function () {
            console.log("connected");
        });
    }

}