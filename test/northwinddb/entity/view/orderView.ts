import { column, Entity } from "../../../../src";

export class OrderView extends Entity {
    @column("Id", "Order")
    public orderId: number
    @column("CustomerId", "Order");
    public customer: string;
    @column("LastName", "Employee")
    public employeeLastName: string;
    @column("FirstName", "Employee")
    public employeeFirstName: string;
    @column("OrderDate", "Order");
    public orderDate: Date;
    @column("ProductName", "Product")
    public producName: string;
    @column("UnitPrice", "OrderDetail")
    public unitPrice: number;
    @column("Quantity", "OrderDetail")
    public quantity: number;
}
