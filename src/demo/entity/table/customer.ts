import { column } from "../../../decorator";
import { TableEntity } from "../../../model";
import { Order } from "./order";

export class Customer extends TableEntity {
    @column("id", true, false)
    public id: number;
    @column("last_name")
    public lastName: string;
    @column("first_name")
    public firstName: string;

    public orders: Order[];

    public getTableName(): string {
        return "customers";
    }
}
