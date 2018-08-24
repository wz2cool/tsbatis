import { column } from "../../../src/index";

export class CustomerView {
  @column({ columnName: "Id", table: "customer" })
  public id: string;
  @column({ columnName: "CompanyName", table: "customer" })
  public companyName: string;
  @column({ columnName: "ContactName", table: "customer" })
  public contactName: string;
  @column({ columnName: "ContactTitle", table: "customer" })
  public contactTitle: string;
}
