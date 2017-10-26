import { BaseTableMapper } from "../../mapper";
import { Customer } from "../entity/table/customer";

export class CustomerMapper extends BaseTableMapper<Customer> {
    public getEntityClass(): new () => Customer {
        return Customer;
    }
}
