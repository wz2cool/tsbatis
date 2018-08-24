import { column } from "../../../decorator";
import { TableEntity } from "../../../model";
import { OrderDetailStatus } from "./orderDetailStatus";
import { Product } from "./product";

export class OrderDetail extends TableEntity {
  @column({ columnName: "id" })
  public id: number;
  @column({ columnName: "order_id" })
  public orderId: number;
  @column({ columnName: "quantity" })
  public quantity: number;
  @column({ columnName: "unit_price" })
  public unitPrice: number;
  @column({ columnName: "discount" })
  public discount: number;
  @column({ columnName: "product_id" })
  public productId: number;
  @column({ columnName: "status_id" })
  public statusId: number;

  public status: OrderDetailStatus;
  public product: Product;
  public getTableName(): string {
    return "order_details";
  }
}
