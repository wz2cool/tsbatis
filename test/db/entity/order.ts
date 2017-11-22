import { column, TableEntity } from "../../../src/";

export class Order extends TableEntity {
    @column("Id", true, true)
    public id: number;
    @column("CustomerId", false, true)
    public customerId: string;
    @column("EmployeeId", false, true)
    public employeeId: number;
    @column("OrderDate", false, true)
    public orderDate: string;
    @column("RequiredDate", false, true)
    public requiredDate: string;
    @column("ShippedDate", false, true)
    public shippedDate: string;
    @column("ShipVia", false, true)
    public shipVia: number;
    @column("Freight", false, true)
    public freight: number;
    @column("ShipName", false, true)
    public shipName: string;
    @column("ShipAddress", false, true)
    public shipAddress: string;
    @column("ShipCity", false, true)
    public shipCity: string;
    @column("ShipRegion", false, true)
    public shipRegion: string;
    @column("ShipPostalCode", false, true)
    public shipPostalCode: string;
    @column("ShipCountry", false, true)
    public shipCountry: string;

    public getTableName(): string {
        return "Order";
    }
}
