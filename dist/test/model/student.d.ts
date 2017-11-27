import { TableEntity } from "../../src/model/index";
export declare class Student extends TableEntity {
    name: string;
    age: number;
    getTableName(): string;
}
