import { BaseTableMapper } from "../../mapper";
import { Order } from "../entity/table/order";
export declare class OrderMapper extends BaseTableMapper<Order> {
    getEntityClass(): new () => Order;
}
