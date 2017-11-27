import { AssociationRelation, CollectionRelation } from "../../../model";
import { Customer } from "../table/customer";
import { Order } from "../table/order";
import { OrderDetail } from "../table/orderDetail";
import { OrderDetailStatus } from "../table/orderDetailStatus";
import { OrderStatus } from "../table/orderStatus";
import { Product } from "../table/product";
export declare class Relations {
    static getOrderDetail_OrderDetailStatusRelation(): AssociationRelation<OrderDetail, OrderDetailStatus>;
    static getOrderDetail_ProductRelation(): AssociationRelation<OrderDetail, Product>;
    static getOrder_OrderDetailRelation(): AssociationRelation<Order, OrderDetail>;
    static getOrder_OrderStatusRelation(): AssociationRelation<Order, OrderStatus>;
    static getCustomer_OrderRelation(): CollectionRelation<Customer, Order>;
}
