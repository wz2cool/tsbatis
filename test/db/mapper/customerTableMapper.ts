import { BaseTableMapper } from "../../../src";
import { Customer } from "../entity/customer";

export class CustomerTableMapper extends BaseTableMapper<Customer> {
    public getEntityClass(): new () => Customer {
        return Customer;
    }
}
