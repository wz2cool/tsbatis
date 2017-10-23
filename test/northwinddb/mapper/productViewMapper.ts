import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseMapper, ISqlConnection } from "../../../src";
import { InjectableSqliteConnection } from "../connection/injectableSqliteConnection";
import { NorthwindProductView } from "../entity/view/NothwindProductView";

@injectable()
export class ProductViewMapper extends BaseMapper<NorthwindProductView> {
    constructor(connection: InjectableSqliteConnection) {
        super(connection);
    }

    public getEntityClass(): new () => NorthwindProductView {
        return NorthwindProductView;
    }
}
