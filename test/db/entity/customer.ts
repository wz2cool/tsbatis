import { column, TableEntity } from "../../../src/";

export class Customer extends TableEntity {
  @column({ columnName: "Id", isPK: true, autoIncrease: true })
  public id: string;
  @column({ columnName: "CompanyName" })
  public companyName: string;
  @column({ columnName: "ContactName" })
  public contactName: string;
  @column({ columnName: "ContactTitle" })
  public contactTitle: string;
  @column({ columnName: "Address" })
  public address: string;
  @column({ columnName: "City" })
  public city: string;
  @column({ columnName: "Region" })
  public region: string;
  @column({ columnName: "PostalCode" })
  public postalCode: string;
  @column({ columnName: "Country" })
  public country: string;
  @column({ columnName: "Phone" })
  public phone: string;
  @column({ columnName: "Fax" })
  public fax: string;

  public getTableName(): string {
    return "Customer";
  }
}
