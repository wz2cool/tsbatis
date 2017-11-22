import { column, TableEntity } from "../../../src/";

export class Category extends TableEntity {
    @column("Id", true, true)
    public id: number;
    @column("CategoryName", false, true)
    public categoryName: string;
    @column("Description", false, true)
    public description: string;

    public getTableName(): string {
        return "Category";
    }
}
