import { TableEntity } from "../../../src/";
export declare class Product extends TableEntity {
    id: number;
    productName: string;
    supplierId: number;
    categoryId: number;
    quantityPerUnit: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: number;
    getTableName(): string;
}
