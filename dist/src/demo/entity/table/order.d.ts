import { TableEntity } from "../../../model";
import { OrderDetail } from "./orderDetail";
import { OrderStatus } from "./orderStatus";
export declare class Order extends TableEntity {
    id: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipStateProvince: string;
    statusId: number;
    customerId: number;
    orderDetail: OrderDetail;
    status: OrderStatus;
    getTableName(): string;
}
