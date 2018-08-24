import { column, TableEntity } from "../../../src/";

export class Student extends TableEntity {
  @column({ columnName: "name" })
  public name: string;
  @column({ columnName: "age" })
  public age: number;

  public getTableName(): string {
    return "student";
  }
}
