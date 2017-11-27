import { TableEntity } from "../../../src/";
export declare class Territory extends TableEntity {
    id: string;
    territoryDescription: string;
    regionId: number;
    getTableName(): string;
}
