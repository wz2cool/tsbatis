import { Column } from "../../../../src/decorator";
import { TableEntity } from "../../../../src/model";

export class User extends TableEntity {
    @Column("id", true, false)
    public id: number;
    @Column("username")
    public username: string;
    @Column("password")
    public password: string;

    public getTableName(): string {
        return "users";
    }
}
