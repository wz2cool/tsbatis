import { TableEntity } from "../../../model";
export declare class Student extends TableEntity {
    id: number;
    name: string;
    age: number;
    createTime: Date;
    updateTime: Date;
    getTableName(): string;
}
