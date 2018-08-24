import { column, Entity } from "../../../src";
import { CustomerView } from "./customerView";

export class OrderView extends Entity {
  @column({ columnName: "shipName", table: "order" })
  public shipName: string;
  @column({ columnName: "shipAddress", table: "order" })
  public shipAddress: string;
  @column({ columnName: "customerId", table: "order" })
  public customerId: string;

  public customer: CustomerView;
}
