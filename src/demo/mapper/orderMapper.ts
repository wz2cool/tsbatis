import { BaseTableMapper } from "../../mapper";
import { Order } from "../entity/table/order";

export class OrderMapper extends BaseTableMapper<Order> {
    public getEntityClass(): new () => Order {
        return Order;
    }
}
