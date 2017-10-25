import { column } from "../../../decorator";
import { TableEntity } from "../../../model";
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

    public product: Product;
    public getTableName(): string {
        return "order_details";
    }
}
