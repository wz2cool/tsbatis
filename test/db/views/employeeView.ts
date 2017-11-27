import { CustomerView } from "./customerView";
import { column, Entity } from "../../../src/index";

export class EmployeeView extends Entity {
    @column("name", "exmployee")
    public name: string;
    @column("name", "exmployee")
    public age: number;
    @column("customerId", "exmployee")
    public customerId: string;

    public customers: CustomerView[];
}
