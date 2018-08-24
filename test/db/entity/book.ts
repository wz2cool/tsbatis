import { column, TableEntity } from "../../../src/";

export class Book extends TableEntity {
  @column({ columnName: "Id", isPK: true, autoIncrease: true })
  public id: number;
  @column({ columnName: "name" })
  public name: string;
  @column({ columnName: "price" })
  public price: number;

  public getTableName(): string {
    return "book";
  }
}
