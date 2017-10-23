import { expect } from "chai";
import * as path from "path";
import * as sqlite3 from "sqlite3";
import {
    BaseMybatisMapper,
    CommonHelper,
    DynamicQuery,
    FilterDescriptor,
    FilterOperator,
    ISqlConnection,
    PageRowBounds,
    SortDescriptor,
    SqliteConnection,
} from "../../src";

import { Container } from "inversify";
import "reflect-metadata";
import { InjectableSqliteConnection } from "./connection/injectableSqliteConnection";
import { InjectableSqlitedb } from "./connection/injectableSqlitedb";
import { NorthwindProductView } from "./entity/view/NothwindProductView";
import { ProductViewMapper } from "./mapper/productViewMapper";
import { ProductViewTemplate } from "./template/productViewTemplate";

const myContainer = new Container();
myContainer.bind<InjectableSqliteConnection>(InjectableSqliteConnection).toSelf();
myContainer.bind<ProductViewMapper>(ProductViewMapper).toSelf();
myContainer.bind<InjectableSqlitedb>(InjectableSqlitedb).toSelf();

describe("baseMapper Test", () => {
    describe("inject Test", () => {
        it("should get inject value", () => {
            const productViewMapper = myContainer.get<ProductViewMapper>(ProductViewMapper);
            expect(false).to.be.eq(CommonHelper.isNullOrUndefined(productViewMapper));
        });
    });

    describe("base Mapper test", () => {
        const productViewMapper = myContainer.get<ProductViewMapper>(ProductViewMapper);
        it("mybatis style sql template", (done) => {
            const query = ProductViewTemplate.getSelectPriceGreaterThan20();
            const paramMap: { [key: string]: any } = {};
            paramMap.price = 20;
            productViewMapper.mybatisSelectEntities(query, paramMap)
                .then((priceViews) => {
                    if (priceViews.length > 0) {
                        done();
                    } else {
                        done("should have items");
                    }
                })
                .catch((err) => {
                    done(err);
                });
        });

        it("paging", (done) => {
            const priceFilter =
                new FilterDescriptor<NorthwindProductView>((u) => u.unitPrice, FilterOperator.LESS_THAN, 20);
            const nameSort =
                new SortDescriptor<NorthwindProductView>((u) => u.productName);
            const dynamicQuery = DynamicQuery.createIntance<NorthwindProductView>()
                .addFilters(priceFilter).addSorts(nameSort);

            const sqlTemplate = ProductViewTemplate.getSelectProductViewByDynamicQuery(dynamicQuery);
            const pageRowBounds = new PageRowBounds(1, 20);
            productViewMapper
                .selectEntitiesPageRowBounds(sqlTemplate.sqlExpression, sqlTemplate.params, pageRowBounds)
                .then((page) => {
                    const pageIndexEq = page.getPageNum() === pageRowBounds.getPageNum();
                    const pageSizeEq = page.getPageSize() === pageRowBounds.getPageSize();
                    const entitiesCountEq = page.getEntities.length <= pageRowBounds.getPageSize();
                    const pagesEq = page.getPages() === Math.ceil(page.getTotal() / page.getPageSize());
                    if (pageIndexEq && pageSizeEq && entitiesCountEq && pagesEq) {
                        done();
                    } else {
                        done("something is invalid");
                    }
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
