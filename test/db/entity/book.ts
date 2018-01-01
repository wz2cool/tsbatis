import { column, TableEntity } from "../../../src/";

export class Book extends TableEntity {
    @column("Id", true, true)
    public id: number;
    @column("name", false)
    public name: string;
    @column("price", false)
    public price: number;

    public getTableName(): string {
        return "Book";
    }
}
