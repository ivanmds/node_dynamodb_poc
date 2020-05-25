import { CustomerRepository } from "../repositories/customer.repository";
import { CustomerRedis } from "../repositories/redis/customer.redis";
import { Customer } from "../models/customer.model";

export class CustomerService {

    private readonly _customerRepository: CustomerRepository = null;
    private readonly _customerRedis: CustomerRedis = null;

    constructor() {
        this._customerRepository = new CustomerRepository();
        this._customerRedis = new CustomerRedis();
    }

    public get(id: string): Promise<Customer> {
        return new Promise<Customer>((resolver, reject) => {
            this._customerRedis.get(id).then((customerRedis) => {

                if (customerRedis) {
                    console.log("got cache");
                    resolver(customerRedis);
                } else {
                    this._customerRepository.get(id).then((customer) => {
                        if (customer) {
                            this._customerRedis.set(customer);
                            resolver(customer);
                        }
                    });

                }
            });

        });
    }

    public put(customer: Customer): Promise<Customer> {
        return new Promise<Customer>((resolver, reject) => {
            this._customerRepository.put(customer).then((customerSaved) => {
                resolver(customer);
            });
        });
    }

    public delete(id: string): Promise<any> {
        return new Promise<any>((resolver, reject) => {
            this._customerRepository.delete(id).then(() => {
               this._customerRedis.delete(id);
               resolver();
            });
        });
    }
}