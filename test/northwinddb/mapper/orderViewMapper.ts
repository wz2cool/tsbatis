import { inject, injectable } from "inversify";
import { BaseMapper, ISqlConnection } from "../../../src";
import { OrderView } from "../entity/view/orderView";
import { TYPES } from "../ioc/types";

@injectable()
export class OrderViewMapper extends BaseMapper<OrderView> {
    constructor( @inject(TYPES.SqliteConnection) connection: ISqlConnection) {
        super(connection);
    }

    public getEntityClass(): new () => OrderView {
        return OrderView;
    }
}
