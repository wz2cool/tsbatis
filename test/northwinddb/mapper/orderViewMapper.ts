import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseMapper, ISqlConnection } from "../../../src";
import { InjectableSqliteConnection } from "../connection/injectableSqliteConnection";
import { OrderView } from "../entity/view/orderView";
import { TYPES } from "../ioc/types";

@injectable()
export class OrderViewMapper extends BaseMapper<OrderView> {
    constructor(connection: InjectableSqliteConnection) {
        super(connection);
    }

    public getEntityClass(): new () => OrderView {
        return OrderView;
    }
}
