import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseMybatisMapper, ISqlConnection } from "../../../src";
import { InjectableSqliteConnection } from "../connection/injectableSqliteConnection";
import { NorthwindProductView } from "../entity/view/NothwindProductView";

@injectable()
export class ProductViewMapper extends BaseMybatisMapper<NorthwindProductView> {
    constructor(connection: InjectableSqliteConnection) {
        super(connection);
    }

    public getEntityClass(): new () => NorthwindProductView {
        return NorthwindProductView;
    }
}
