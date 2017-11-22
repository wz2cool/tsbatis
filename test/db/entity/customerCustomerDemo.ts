import { column, TableEntity } from "../../../src/";

export class CustomerCustomerDemo extends TableEntity {
    @column("Id", true, true)
    public id: string;
    @column("CustomerTypeId", false, true)
    public customerTypeId: string;

    public getTableName(): string {
        return "CustomerCustomerDemo";
    }
}
