import { column, TableEntity } from "../../../src/";

export class CustomerDemographic extends TableEntity {
    @column("Id", true, true)
    public id: string;
    @column("CustomerDesc", false, true)
    public customerDesc: string;

    public getTableName(): string {
        return "CustomerDemographic";
    }
}
