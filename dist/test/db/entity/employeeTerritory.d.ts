import { TableEntity } from "../../../src/";
export declare class EmployeeTerritory extends TableEntity {
    id: string;
    employeeId: number;
    territoryId: string;
    getTableName(): string;
}
