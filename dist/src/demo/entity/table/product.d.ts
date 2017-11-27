import { TableEntity } from "../../../model";
export declare class Product extends TableEntity {
    id: number;
    productName: string;
    standardCost: number;
    getTableName(): string;
}
