import { TableEntity } from "../../../src/";
export declare class Student extends TableEntity {
    name: string;
    age: number;
    getTableName(): string;
}
