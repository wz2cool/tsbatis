import { TableEntity } from "../../src/model/index";

export class Student extends TableEntity {
  public name: string;
  public age: number;

  public getTableName(): string {
    return "student";
  }
}
