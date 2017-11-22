import { column, TableEntity } from "../../../src/";

export class Territory extends TableEntity {
    @column("Id", true, true)
    public id: string;
    @column("TerritoryDescription", false, true)
    public territoryDescription: string;
    @column("RegionId", false, true)
    public regionId: number;

    public getTableName(): string {
        return "Territory";
    }
}
