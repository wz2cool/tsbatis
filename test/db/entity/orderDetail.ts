import { column, TableEntity } from "../../../src/";

export class OrderDetail extends TableEntity {
    @column("Id", true, true)
    public id: string;
    @column("OrderId", false, true)
    public orderId: number;
    @column("ProductId", false, true)
    public productId: number;
    @column("UnitPrice", false, true)
    public unitPrice: number;
    @column("Quantity", false, true)
    public quantity: number;
    @column("Discount", false, true)
    public discount: number;

    public getTableName(): string {
        return "OrderDetail";
    }
}
