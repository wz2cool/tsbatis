import { column } from "../decorator";
import { TableEntity } from "../model";

export class User implements TableEntity {
    @column("id", true, false)
    public id: number;
    @column("user_name")
    public userName: string;
    @column("email")
    public email: string;
    @column("mobile")
    public mobile: string;
    @column("password")
    public password: string;
    @column("display_name")
    public displayName: string;
    @column("create_time")
    public createTime: Date;
    @column("update_time")
    public updateTime: Date;
    @column("deleted")
    public deleted: number;

    public getTableName(): string {
        return "user";
    }
}
