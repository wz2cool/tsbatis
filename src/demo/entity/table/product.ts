import { column } from "../../../decorator";
import { TableEntity } from "../../../model";

export class Product extends TableEntity {
    public id: number;
    public productName: string;
    public standardCost: string;

    public getTableName(): string {
        return "products";
    }
}
