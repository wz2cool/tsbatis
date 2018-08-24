import { column } from "../../../decorator";
import { TableEntity } from "../../../model";

export class OrderStatus extends TableEntity {
  @column({ columnName: "id", isPK: true, autoIncrease: false })
  public id: number;
  @column({ columnName: "status_name" })
  public statusName: string;

  public getTableName(): string {
    return "orders_status";
  }
}
