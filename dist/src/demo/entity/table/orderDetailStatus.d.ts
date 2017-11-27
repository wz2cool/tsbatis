import { TableEntity } from "../../../model";
export declare class OrderDetailStatus extends TableEntity {
    id: number;
    statusName: string;
    getTableName(): string;
}
