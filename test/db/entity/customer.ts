import { column, TableEntity } from "../../../src/";

export class Customer extends TableEntity {
    @column("Id", true, true)
    public id: string;
    @column("CompanyName", false)
    public companyName: string;
    @column("ContactName", false)
    public contactName: string;
    @column("ContactTitle", false)
    public contactTitle: string;
    @column("Address", false)
    public address: string;
    @column("City", false)
    public city: string;
    @column("Region", false)
    public region: string;
    @column("PostalCode", false)
    public postalCode: string;
    @column("Country", false)
    public country: string;
    @column("Phone", false)
    public phone: string;
    @column("Fax", false)
    public fax: string;

    public getTableName(): string {
        return "Customer";
    }
}
