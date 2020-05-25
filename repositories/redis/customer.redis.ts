import { BaseRedis } from "./base.redis";
import { Customer } from "../../models/customer.model";

export class CustomerReids extends BaseRedis<Customer> {

    constructor() {
        super("poc:customer");
    }

}