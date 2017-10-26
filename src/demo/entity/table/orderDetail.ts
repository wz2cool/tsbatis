import { column } from "../../../decorator";
import { TableEntity } from "../../../model";
import { OrderDetailStatus } from "./orderDetailStatus";
import { Product } from "./product";

export class OrderDetail extends TableEntity {
    @column("id")
    public id: number;
    @column("order_id")
    public orderId: number;
    @column("quantity")
    public quantity: number;
    @column("unit_price")
    public unitPrice: number;
    @column("discount")
    public discount: number;
    @column("product_id")
    public productId: number;
    @column("status_id")
    public statusId: number;

    public status: OrderDetailStatus;
    public product: Product;
    public getTableName(): string {
        return "order_details";
    }
}
