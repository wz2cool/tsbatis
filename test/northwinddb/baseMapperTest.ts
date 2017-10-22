import { expect } from "chai";
import * as path from "path";
import * as sqlite3 from "sqlite3";
import {
    BaseMapper,
    CommonHelper,
    DynamicQuery,
    FilterDescriptor,
    FilterOperator,
    ISqlConnection,
    SqliteConnection,
} from "../../src";

import { Container } from "inversify";
import { InjectableSqliteConnection } from "./connection/injectableSqliteConnection";
import { OrderView } from "./entity/view/orderView";
import { TYPES } from "./ioc/types";
import { OrderViewMapper } from "./mapper/orderViewMapper";

const myContainer = new Container();
myContainer.bind<ISqlConnection>(TYPES.SqliteConnection).to(InjectableSqliteConnection);
myContainer.bind<BaseMapper<OrderView>>(TYPES.OrderViewMapper).to(OrderViewMapper);

describe("inject Test", () => {
    it("should get inject value", () => {
        const orderViewMapper = myContainer.get<BaseMapper<OrderView>>(TYPES.OrderViewMapper);
        console.log("inject value: ", orderViewMapper);
        expect(false).to.be.eq(CommonHelper.isNullOrUndefined(orderViewMapper));
    });
});
