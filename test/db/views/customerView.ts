import { column } from "../../../src/index";

export class CustomerView {
    @column("Id", "customer")
    public id: string;
    @column("CompanyName", "customer")
    public companyName: string;
    @column("ContactName", "customer")
    public contactName: string;
    @column("ContactTitle", "customer")
    public contactTitle: string;
}
