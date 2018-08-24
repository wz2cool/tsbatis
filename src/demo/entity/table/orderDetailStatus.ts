import { column } from "../../../decorator";
import { TableEntity } from "../../../model";

export class OrderDetailStatus extends TableEntity {
  @column({ columnName: "id", isPK: true, autoIncrease: false })
  public id: number;
  @column({ columnName: "status_name" })
  public statusName: string;

  public getTableName(): string {
    return "order_details_status";
  }
}
