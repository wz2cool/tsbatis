import { TableEntity } from "../../src/index";

export class ErrorModel extends TableEntity {
  public getTableName(): string {
    return "error_model";
  }
}
