import { column } from "../../../decorator";
import { TableEntity } from "../../../model";

export class Product extends TableEntity {
    @column("id")
    public id: number;
    @column("product_name")
    public productName: string;
    @column("standard_cost")
    public standardCost: number;

    public getTableName(): string {
        return "products";
    }
}
