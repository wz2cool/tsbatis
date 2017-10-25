import { column } from "../../../decorator";
import { TableEntity } from "../../../model";
import { OrderDetail } from "./orderDetail";

export class Order extends TableEntity {
    @column("id", true, false)
    public id: number;
    @column("ship_name")
    public shipName: string;
    @column("ship_address")
    public shipAddress: string;
    @column("ship_city")
    public shipCity: string;
    @column("ship_state_province")
    public shipStateProvince: string;

    // for one to one relation (association)
    public orderDetail: OrderDetail;

    public getTableName(): string {
        return "orders";
    }
}
