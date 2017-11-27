import { TableEntity } from "../../../src/";
export declare class Category extends TableEntity {
    id: number;
    categoryName: string;
    description: string;
    getTableName(): string;
}
