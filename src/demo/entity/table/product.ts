import { column } from "../../../decorator";
import { TableEntity } from "../../../model";

export class Product extends TableEntity {
  @column({ columnName: "id" })
  public id: number;
  @column({ columnName: "product_name" })
  public productName: string;
  @column({ columnName: "standard_cost" })
  public standardCost: number;

  public getTableName(): string {
    return "products";
  }
}
