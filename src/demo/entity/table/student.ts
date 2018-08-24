import { column } from "../../../decorator";
import { TableEntity } from "../../../model";

export class Student extends TableEntity {
  @column({ columnName: "id", isPK: true, autoIncrease: false })
  public id: number;
  @column({ columnName: "name" })
  public name: string;
  @column({ columnName: "age" })
  public age: number;
  @column({ columnName: "create_time" })
  public createTime: Date;
  @column({ columnName: "update_time" })
  public updateTime: Date;

  public getTableName(): string {
    return "students";
  }
}
