import { column } from "../../../decorator";
import { TableEntity } from "../../../model";
import { OrderDetail } from "./orderDetail";
import { OrderStatus } from "./orderStatus";

export class Order extends TableEntity {
  @column({ columnName: "id", isPK: true, autoIncrease: false })
  public id: number;
  @column({ columnName: "ship_name" })
  public shipName: string;
  @column({ columnName: "ship_address" })
  public shipAddress: string;
  @column({ columnName: "ship_city" })
  public shipCity: string;
  @column({ columnName: "ship_state_province" })
  public shipStateProvince: string;
  @column({ columnName: "status_id" })
  public statusId: number;
  @column({ columnName: "customer_id" })
  public customerId: number;

  // for one to one relation (association)
  public orderDetail: OrderDetail;
  public status: OrderStatus;

  public getTableName(): string {
    return "orders";
  }
}
