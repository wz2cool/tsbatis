import { TableEntity } from "../../../model";
import { Order } from "./order";
export declare class Customer extends TableEntity {
    id: number;
    lastName: string;
    firstName: string;
    orders: Order[];
    getTableName(): string;
}
