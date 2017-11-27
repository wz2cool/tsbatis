import { Entity } from "../../../src/index";
import { CustomerView } from "./customerView";
export declare class EmployeeView extends Entity {
    name: string;
    age: number;
    customerId: string;
    customers: CustomerView[];
}
