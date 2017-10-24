import { column, TableEntity } from "../../../src";
export class Customer extends TableEntity {
    @column("id", true, false)
    public id: number;
    @column("compnay")
    public company: string;
    @column("last_name")
    public lastName: string;
    @column("first_ame")
    public firstName: string;
    @column("email_address")
    public emailAddress: string;
    @column("job_title")
    public jobTitle: string;

    public getTableName(): string {
        return "customers";
    }
}
