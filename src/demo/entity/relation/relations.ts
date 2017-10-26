import { AssociationRelation, CollectionRelation, RelationBase } from "../../../model";
import { SqlTemplateProvider } from "../../../provider";
import { Customer } from "../table/customer";
import { Order } from "../table/order";
import { OrderDetail } from "../table/orderDetail";
import { OrderDetailStatus } from "../table/orderDetailStatus";
import { OrderStatus } from "../table/orderStatus";
import { Product } from "../table/product";

export class Relations {
    public static getOrderDetail_OrderDetailStatusRelation(): AssociationRelation<OrderDetail, OrderDetailStatus> {
        const relation = new AssociationRelation<OrderDetail, OrderDetailStatus>(
            (source) => source.status,
            (source) => source.statusId,
            (ref) => ref.id,
            OrderDetailStatus,
            SqlTemplateProvider.getSelectSql(OrderDetailStatus));
        return relation;
    }

    public static getOrderDetail_ProductRelation(): AssociationRelation<OrderDetail, Product> {
        const relation = new AssociationRelation<OrderDetail, Product>(
            (source: OrderDetail) => source.product,
            (source: OrderDetail) => source.productId,
            (ref: Product) => ref.id,
            Product,
            SqlTemplateProvider.getSelectSql(Product));
        return relation;
    }

    public static getOrder_OrderDetailRelation(): AssociationRelation<Order, OrderDetail> {
        const relation = new AssociationRelation<Order, OrderDetail>(
            (source: Order) => source.orderDetail,
            (source: Order) => source.id,
            (ref: OrderDetail) => ref.orderId,
            OrderDetail,
            SqlTemplateProvider.getSelectSql(OrderDetail));

        const orderDetailToProductRelation = Relations.getOrderDetail_ProductRelation();
        const orderDetailToOrderDetailStatusRelation = Relations.getOrderDetail_OrderDetailStatusRelation();
        relation.relations.push(orderDetailToProductRelation);
        relation.relations.push(orderDetailToOrderDetailStatusRelation);
        return relation;
    }

    public static getOrder_OrderStatusRelation(): AssociationRelation<Order, OrderStatus> {
        const relation = new AssociationRelation<Order, OrderStatus>(
            (source: Order) => source.status,
            (source: Order) => source.statusId,
            (ref: OrderStatus) => ref.id,
            OrderStatus,
            SqlTemplateProvider.getSelectSql(OrderStatus));
        return relation;
    }

    public static getCustom_OrderRelation(): CollectionRelation<Customer, Order> {
        const relation = new CollectionRelation<Customer, Order>(
            (source: Customer) => source.orders,
            (source: Customer) => source.id,
            (ref: Order) => ref.customerId,
            Order,
            SqlTemplateProvider.getSelectSql(Order));
        relation.relations.push(Relations.getOrder_OrderDetailRelation());
        relation.relations.push(Relations.getOrder_OrderStatusRelation());
        return relation;
    }
}
