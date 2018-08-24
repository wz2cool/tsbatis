import { column, TableEntity } from "../../../src/";

export class Order extends TableEntity {
  @column({ columnName: "Id", isPK: true, autoIncrease: true })
  public id: number;
  @column({ columnName: "CustomerId" })
  public customerId: string;
  @column({ columnName: "EmployeeId" })
  public employeeId: number;
  @column({ columnName: "OrderDate" })
  public orderDate: string;
  @column({ columnName: "RequiredDate" })
  public requiredDate: string;
  @column({ columnName: "ShippedDate" })
  public shippedDate: string;
  @column({ columnName: "ShipVia" })
  public shipVia: number;
  @column({ columnName: "Freight" })
  public freight: number;
  @column({ columnName: "ShipName" })
  public shipName: string;
  @column({ columnName: "ShipAddress" })
  public shipAddress: string;
  @column({ columnName: "ShipCity" })
  public shipCity: string;
  @column({ columnName: "ShipRegion" })
  public shipRegion: string;
  @column({ columnName: "ShipPostalCode" })
  public shipPostalCode: string;
  @column({ columnName: "ShipCountry" })
  public shipCountry: string;

  public getTableName(): string {
    return "Order";
  }
}
