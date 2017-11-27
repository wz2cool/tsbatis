import { column, Entity } from "../../../src";
import { CustomerView } from "./customerView";

export class OrderView extends Entity {
    @column("shipName", "order")
    public shipName: string;
    @column("shipAddress", "order")
    public shipAddress: string;
    @column("customerId", "order")
    public customerId: string;

    public customer: CustomerView;
}
