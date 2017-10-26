import { column } from "../../../decorator";
import { TableEntity } from "../../../model";
import { OrderDetail } from "./orderDetail";
import { OrderStatus } from "./orderStatus";

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
    @column("status_id")
    public statusId: number;

    // for one to one relation (association)
    public orderDetail: OrderDetail;
    public status: OrderStatus;

    public getTableName(): string {
        return "orders";
    }
}
