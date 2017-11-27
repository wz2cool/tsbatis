import { Entity } from "../../../src";
import { CustomerView } from "./customerView";
export declare class OrderView extends Entity {
    shipName: string;
    shipAddress: string;
    customerId: string;
    customer: CustomerView;
}
