import { column } from "../../../../src/decorator";
import { TableEntity } from "../../../../src/model";

export class User extends TableEntity {
    @column("id", true, false)
    public id: number;
    @column("username")
    public username: string;
    @column("password")
    public password: string;

    public getTableName(): string {
        return "users";
    }
}
