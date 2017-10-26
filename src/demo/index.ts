import * as mysql from "mysql";
import { MysqlConnection } from "../connection";
import { SqlTemplateProvider } from "../provider";
import { Relation } from "./entity/relation/relation";
import { Order } from "./entity/table/order";
import { OrderMapper } from "./mapper/orderMapper";

const pool = mysql.createPool({
    host: "sql12.freemysqlhosting.net",
    port: 3306,
    // tslint:disable-next-line:object-literal-sort-keys
    database: "sql12200910",
    user: "sql12200910",
    password: "ku8lhu9lAg",
});

const relation = Relation.getOrderToOrderDetailRelation();
const connection = new MysqlConnection(pool);
const mapper = new OrderMapper(connection);

mapper.selectByPrimaryKey(31, [Relation.getOrderToOrderDetailRelation(), Relation.getOrderToOrderStatusRelation()])
    .then((orders) => {
        console.log(JSON.stringify(orders));
    })
    .catch((err) => {
        console.error(err);
    });
