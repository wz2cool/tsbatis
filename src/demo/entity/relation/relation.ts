import { AssociationRelation, RelationBase } from "../../../model";
import { SqlTemplateProvider } from "../../../provider";
import { Order } from "../table/order";
import { OrderDetail } from "../table/orderDetail";
import { OrderDetailStatus } from "../table/orderDetailStatus";
import { OrderStatus } from "../table/orderStatus";
import { Product } from "../table/product";

export class Relation {
    public static getOrderDetailToOrderDetailStatusRelation(): AssociationRelation<OrderDetail, OrderDetailStatus> {
        const relation = new AssociationRelation<OrderDetail, OrderDetailStatus>(
            (source) => source.status,
            (source) => source.statusId,
            (ref) => ref.id,
            OrderDetailStatus,
            SqlTemplateProvider.getSelectSql(OrderDetailStatus));
        return relation;
    }

    public static getOrderDetailToProductRelation(): AssociationRelation<OrderDetail, Product> {
        const relation = new AssociationRelation<OrderDetail, Product>(
            (source) => source.product,
            (source) => source.productId,
            (ref) => ref.id,
            Product,
            SqlTemplateProvider.getSelectSql(Product));
        return relation;
    }

    public static getOrderToOrderDetailRelation(): AssociationRelation<Order, OrderDetail> {
        const relation = new AssociationRelation<Order, OrderDetail>(
            (source) => source.orderDetail,
            (source) => source.id,
            (ref) => ref.orderId,
            OrderDetail,
            SqlTemplateProvider.getSelectSql(OrderDetail));

        const orderDetailToProductRelation = Relation.getOrderDetailToProductRelation();
        const orderDetailToOrderDetailStatusRelation = Relation.getOrderDetailToOrderDetailStatusRelation();
        relation.relations.push(orderDetailToProductRelation);
        relation.relations.push(orderDetailToOrderDetailStatusRelation);
        return relation;
    }

    public static getOrderToOrderStatusRelation(): AssociationRelation<Order, OrderStatus> {
        const relation = new AssociationRelation<Order, OrderStatus>(
            (source) => source.status,
            (source) => source.statusId,
            (ref) => ref.id,
            OrderStatus,
            SqlTemplateProvider.getSelectSql(OrderStatus));
        return relation;
    }
}
