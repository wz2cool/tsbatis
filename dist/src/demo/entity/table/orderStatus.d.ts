import { TableEntity } from "../../../model";
export declare class OrderStatus extends TableEntity {
    id: number;
    statusName: string;
    getTableName(): string;
}
