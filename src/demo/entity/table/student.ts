import { column } from "../../../decorator";
import { TableEntity } from "../../../model";

export class Student extends TableEntity {
    @column("id", true, false)
    public id: number;
    @column("name")
    public name: string;
    @column("age")
    public age: number;
    @column("create_time")
    public createTime: Date;
    @column("update_time")
    public updateTime: Date;

    public getTableName(): string {
        return "student";
    }
}
