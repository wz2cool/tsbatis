"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("../../src/index");
var associationRelation_1 = require("../../src/model/associationRelation");
var index_2 = require("../../src/model/index");
var customerView_1 = require("../db/views/customerView");
describe(".AssociationRelation", function () {
    describe("#constructor", function () {
        it("inital", function () {
            var idFilter = new index_2.FilterDescriptor(function (u) { return u.id; }, index_1.FilterOperator.GREATER_THAN, "3");
            var query = index_1.DynamicQuery.createIntance();
            query.addFilters(idFilter);
            var result = new associationRelation_1.AssociationRelation(function (s) { return s.customer; }, function (s) { return s.customerId; }, function (t) { return t.id; }, customerView_1.CustomerView, 
            // tslint:disable-next-line:max-line-length
            "SELECT id AS Id, companyName AS CompanyName, contactName AS ConstactName, contactTitle AS ContactTitle FROM customer", query);
            chai_1.expect("customer").to.be.eq(result.getMappingProp());
            chai_1.expect("customerId").to.be.eq(result.getSourceProp());
            chai_1.expect("id").to.be.eq(result.getTargetProp());
            chai_1.expect(customerView_1.CustomerView).to.be.eq(result.getTargetEntityClass());
            // tslint:disable-next-line:max-line-length
            chai_1.expect("SELECT id AS Id, companyName AS CompanyName, contactName AS ConstactName, contactTitle AS ContactTitle FROM customer").to.be.eq(result.getSelectSql());
            chai_1.expect(query).to.be.eq(result.getDynamicQuery());
        });
    });
});
//# sourceMappingURL=associationRelationTest.js.map