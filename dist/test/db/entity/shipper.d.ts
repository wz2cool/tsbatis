import { TableEntity } from "../../../src/";
export declare class Shipper extends TableEntity {
    id: number;
    companyName: string;
    phone: string;
    getTableName(): string;
}
