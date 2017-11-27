import { TableEntity } from "../../../src/";
export declare class OrderDetail extends TableEntity {
    id: string;
    orderId: number;
    productId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
    getTableName(): string;
}
