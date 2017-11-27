import { BaseTableMapper } from "../../mapper";
import { Customer } from "../entity/table/customer";
export declare class CustomerMapper extends BaseTableMapper<Customer> {
    getEntityClass(): new () => Customer;
}
