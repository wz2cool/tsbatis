import { column, Entity } from "../../../src/index";
import { CustomerView } from "./customerView";

export class EmployeeView extends Entity {
  @column({ columnName: "name", table: "exmployee" })
  public name: string;
  @column({ columnName: "age", table: "exmployee" })
  public age: number;
  @column({ columnName: "customerId", table: "exmployee" })
  public customerId: string;

  public customers: CustomerView[];
}
