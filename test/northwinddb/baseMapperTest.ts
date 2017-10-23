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
import "reflect-metadata";
import { InjectableSqliteConnection } from "./connection/injectableSqliteConnection";
import { InjectableSqlitedb } from "./connection/injectableSqlitedb";
import { OrderView } from "./entity/view/orderView";
import { TYPES } from "./ioc/types";
import { OrderViewMapper } from "./mapper/orderViewMapper";

const myContainer = new Container();
myContainer.bind<InjectableSqliteConnection>(InjectableSqliteConnection).toSelf();
myContainer.bind<OrderViewMapper>(OrderViewMapper).toSelf();
myContainer.bind<InjectableSqlitedb>(InjectableSqlitedb).toSelf();

describe("inject Test", () => {
    it("should get inject value", () => {
        const orderViewMapper = myContainer.get<OrderViewMapper>(OrderViewMapper);
        console.log("inject value: ", orderViewMapper);
        expect(false).to.be.eq(CommonHelper.isNullOrUndefined(orderViewMapper));
    });
});
