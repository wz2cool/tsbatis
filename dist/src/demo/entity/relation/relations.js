"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../../../model");
var provider_1 = require("../../../provider");
var order_1 = require("../table/order");
var orderDetail_1 = require("../table/orderDetail");
var orderDetailStatus_1 = require("../table/orderDetailStatus");
var orderStatus_1 = require("../table/orderStatus");
var product_1 = require("../table/product");
var Relations = /** @class */ (function () {
    function Relations() {
    }
    Relations.getOrderDetail_OrderDetailStatusRelation = function () {
        var relation = new model_1.AssociationRelation(function (source) { return source.status; }, function (source) { return source.statusId; }, function (ref) { return ref.id; }, orderDetailStatus_1.OrderDetailStatus, provider_1.SqlTemplateProvider.getSelectSql(orderDetailStatus_1.OrderDetailStatus));
        return relation;
    };
    Relations.getOrderDetail_ProductRelation = function () {
        var relation = new model_1.AssociationRelation(function (source) { return source.product; }, function (source) { return source.productId; }, function (ref) { return ref.id; }, product_1.Product, provider_1.SqlTemplateProvider.getSelectSql(product_1.Product));
        return relation;
    };
    Relations.getOrder_OrderDetailRelation = function () {
        var relation = new model_1.AssociationRelation(function (source) { return source.orderDetail; }, function (source) { return source.id; }, function (ref) { return ref.orderId; }, orderDetail_1.OrderDetail, provider_1.SqlTemplateProvider.getSelectSql(orderDetail_1.OrderDetail));
        var orderDetailToProductRelation = Relations.getOrderDetail_ProductRelation();
        var orderDetailToOrderDetailStatusRelation = Relations.getOrderDetail_OrderDetailStatusRelation();
        relation.relations.push(orderDetailToProductRelation);
        relation.relations.push(orderDetailToOrderDetailStatusRelation);
        return relation;
    };
    Relations.getOrder_OrderStatusRelation = function () {
        var relation = new model_1.AssociationRelation(function (source) { return source.status; }, function (source) { return source.statusId; }, function (ref) { return ref.id; }, orderStatus_1.OrderStatus, 
        // 获取查询table 语句
        provider_1.SqlTemplateProvider.getSelectSql(orderStatus_1.OrderStatus));
        return relation;
    };
    Relations.getCustomer_OrderRelation = function () {
        var statusFilter = new model_1.FilterDescriptor(function (o) { return o.statusId; }, model_1.FilterOperator.EQUAL, 3);
        var dynamicQuery = model_1.DynamicQuery.createIntance().addFilters(statusFilter);
        var relation = new model_1.CollectionRelation(function (source) { return source.orders; }, function (source) { return source.id; }, function (ref) { return ref.customerId; }, order_1.Order, provider_1.SqlTemplateProvider.getSelectSql(order_1.Order), dynamicQuery);
        relation.relations.push(Relations.getOrder_OrderDetailRelation());
        relation.relations.push(Relations.getOrder_OrderStatusRelation());
        return relation;
    };
    return Relations;
}());
exports.Relations = Relations;
//# sourceMappingURL=relations.js.map