import { column, TableEntity } from "../../../src/";

export class Shipper extends TableEntity {
    @column("Id", true, true)
    public id: number;
    @column("CompanyName", false, true)
    public companyName: string;
    @column("Phone", false, true)
    public phone: string;

    public getTableName(): string {
        return "Shipper";
    }
}
