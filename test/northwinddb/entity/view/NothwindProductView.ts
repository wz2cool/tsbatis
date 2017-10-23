import { column, Entity } from "../../../../src";

export class NorthwindProductView extends Entity {
    @column("Id", "Product")
    public productId: number;
    @column("ProductName", "Product")
    public productName: string;
    @column("UnitPrice", "Product")
    public unitPrice: number;
    @column("CategoryName", "Category")
    public categoryName: string;
}
