import { column } from "../../../decorator";
import { TableEntity } from "../../../model";
import { Order } from "./order";

export class Customer extends TableEntity {
  @column({ columnName: "id", isPK: true, autoIncrease: false })
  public id: number;
  @column({ columnName: "last_name" })
  public lastName: string;
  @column({ columnName: "first_name" })
  public firstName: string;

  public orders: Order[];

  public getTableName(): string {
    return "customers";
  }
}
