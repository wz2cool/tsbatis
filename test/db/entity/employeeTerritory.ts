import { column, TableEntity } from "../../../src/";

export class EmployeeTerritory extends TableEntity {
    @column("Id", true, true)
    public id: string;
    @column("EmployeeId", false, true)
    public employeeId: number;
    @column("TerritoryId", false, true)
    public territoryId: string;

    public getTableName(): string {
        return "EmployeeTerritory";
    }
}
