import { AssociationRelation, RelationBase } from "../../../model";
import { SqlTemplateProvider } from "../../../provider";
import { Order } from "../table/order";
import { OrderDetail } from "../table/orderDetail";
import { Product } from "../table/product";

export class Relation {
    public static getOrderDetailToProductRelation(): AssociationRelation<OrderDetail, Product> {
        const relation = new AssociationRelation<OrderDetail, Product>(
            (o) => o.product,
            (o) => o.productId,
            (p) => p.id,
            Product,
            SqlTemplateProvider.getSelectSql(Product));
        return relation;
    }

    public static getOrderToOrderDetailRelation() {
        const relation = new AssociationRelation<Order, OrderDetail>(
            (o) => o.orderDetail,
            (o) => o.id,
            (p) => p.orderId,
            OrderDetail,
            SqlTemplateProvider.getSelectSql(OrderDetail));

        const orderDetailToProductRelation = Relation.getOrderDetailToProductRelation();
        relation.relations.push(orderDetailToProductRelation);
        return relation;
    }
}
