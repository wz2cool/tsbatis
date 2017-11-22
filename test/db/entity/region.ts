import { column, TableEntity } from "../../../src/";

export class Region extends TableEntity {
    @column("Id", true, true)
    public id: number;
    @column("RegionDescription", false, true)
    public regionDescription: string;

    public getTableName(): string {
        return "Region";
    }
}
