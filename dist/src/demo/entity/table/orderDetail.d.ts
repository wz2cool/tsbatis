import { TableEntity } from "../../../model";
import { OrderDetailStatus } from "./orderDetailStatus";
import { Product } from "./product";
export declare class OrderDetail extends TableEntity {
    id: number;
    orderId: number;
    quantity: number;
    unitPrice: number;
    discount: number;
    productId: number;
    statusId: number;
    status: OrderDetailStatus;
    product: Product;
    getTableName(): string;
}
