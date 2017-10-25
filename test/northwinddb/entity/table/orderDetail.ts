import { column, TableEntity } from "../../../../src";
import { Product } from "./product";

export class OrderDetail extends TableEntity {
    public id: number;
    public quantity: number;
    public unitPrice: number;
    public discount: number;

    public productId: number;

    public product: Product;

    public getTableName(): string {
        return "order_details";
    }
}
