import { column, TableEntity } from "../../../src/";

export class Product extends TableEntity {
  @column({ columnName: "Id", isPK: true, autoIncrease: true })
  public id: number;
  @column({ columnName: "ProductName" })
  public productName: string;
  @column({ columnName: "SupplierId" })
  public supplierId: number;
  @column({ columnName: "CategoryId" })
  public categoryId: number;
  @column({ columnName: "QuantityPerUnit" })
  public quantityPerUnit: string;
  @column({ columnName: "UnitPrice" })
  public unitPrice: number;
  @column({ columnName: "UnitsInStock" })
  public unitsInStock: number;
  @column({ columnName: "UnitsOnOrder" })
  public unitsOnOrder: number;
  @column({ columnName: "ReorderLevel" })
  public reorderLevel: number;
  @column({ columnName: "Discontinued" })
  public discontinued: number;

  public getTableName(): string {
    return "Product";
  }
}
