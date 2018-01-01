import { column, TableEntity } from "../../../src/";

export class Student extends TableEntity {
    @column("name", false)
    public name: string;
    @column("age", false)
    public age: number;

    public getTableName(): string {
        return "student";
    }
}
