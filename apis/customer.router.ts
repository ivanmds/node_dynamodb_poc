import { Router } from '../common/router';
import * as restify from 'restify';
import { Customer } from '../models/customer.model';
import { NotFoundError } from 'restify-errors';
import { CustomerService } from '../services/customer.services';


class CustomerRouter extends Router {

    private _service: CustomerService;

    constructor() {
        super();

        this._service = new CustomerService();
    }

    applyRoutes(application: restify.Server) {

        application.get('/customers/:id', (req, res, next) => {
            this._service.get(req.params.id).then(customer => {
                
                if (customer) {
                    res.send(customer);
                    return next();
                } else {
                    return next(new NotFoundError("customer was not found"));
                }
            }).catch(next);
        });

        application.post('/customers', (req, res, next) => {
            let customer = new Customer(
                req.body.name,
                req.body.alias,
                req.body.document,
                req.body.motherName,
            );

            this._service.put(customer).then(customerResult => {
                res.send(customerResult);
                return next();
            }).catch(next);
        });

        application.del('/customers/:id', (req, res, next) => {
            this._service.delete(req.params.id).then(() => {
                res.send(200);
                return next();
            }).catch(next);
        });
    }
}

export const customerRouter = new CustomerRouter()