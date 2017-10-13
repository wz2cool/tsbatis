import { column } from "../decorator";

export class User {
    @column("id", "user", false)
    public id: number;
    @column("user_name", "user")
    public userName: string;
    @column("email", "user")
    public email: string;
    @column("mobile", "user")
    public mobile: string;
    @column("password", "user")
    public password: string;
    @column("display_name", "user")
    public displayName: string;
    @column("create_time", "user")
    public createTime: Date;
    @column("update_time", "user")
    public updateTime: Date;
    @column("deleted", "user")
    public deleted: number;
}
