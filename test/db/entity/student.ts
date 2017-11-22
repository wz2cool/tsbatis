import { column, TableEntity } from "../../../src/";

export class Student extends TableEntity {
    @column("name", false, true)
    public name: string;
    @column("age", false, true)
    public age: number;

    public getTableName(): string {
        return "student";
    }
}
