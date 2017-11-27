"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customSortDescriptor_1 = require("../../src/model/customSortDescriptor");
var chai_1 = require("chai");
var src_1 = require("../../src");
var model_1 = require("../../src/model");
var customer_1 = require("../db/entity/customer");
var filterOperator_1 = require("../../src/model/filterOperator");
var sortDirection_1 = require("../../src/model/sortDirection");
var filterGroupDescriptor_1 = require("../../src/model/filterGroupDescriptor");
var ErrorModel_1 = require("../model/ErrorModel");
describe(".SqlTemplateProvider", function () {
    describe("#getPkColumn", function () {
        it("should return 'id' if pk is 'id'", function () {
            var result = src_1.SqlTemplateProvider.getPkColumn(new customer_1.Customer());
            chai_1.expect("id").to.be.eq(result.property);
        });
    });
    describe("#getInsert", function () {
        it("should get insert sql template", function () {
            var newCustomer = new customer_1.Customer();
            newCustomer.id = "1";
            newCustomer.companyName = "test";
            newCustomer.contactName = "test";
            newCustomer.contactTitle = "test";
            var result = src_1.SqlTemplateProvider.getInsert(newCustomer, false);
            chai_1.expect("INSERT INTO Customer (CompanyName, ContactName, ContactTitle, " +
                "Address, City, Region, PostalCode, Country, Phone, Fax) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").to.be.eq(result.sqlExpression);
        });
        it("should insertSelective sql template", function () {
            var newCustomer = new customer_1.Customer();
            newCustomer.id = "1";
            newCustomer.companyName = "test";
            newCustomer.contactName = "test";
            newCustomer.contactTitle = "test";
            var result = src_1.SqlTemplateProvider.getInsert(newCustomer, true);
            chai_1.expect("INSERT INTO Customer (CompanyName, ContactName, ContactTitle) " +
                "VALUES (?, ?, ?)").to.be.eq(result.sqlExpression);
        });
    });
    describe("#getDeleteByPk", function () {
        it("should get deleteBypk sql template", function () {
            var result = src_1.SqlTemplateProvider.getDeleteByPk(customer_1.Customer, "2");
            var expectValue = "DELETE FROM Customer WHERE Id = ?";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
        });
        it("should throw error if don't have key column", function () {
            var test = function () {
                src_1.SqlTemplateProvider.getDeleteByPk(ErrorModel_1.ErrorModel, "1");
            };
            chai_1.expect(test).to.throw(Error);
        });
    });
    describe("#getDelete", function () {
        it("should get delete sql template", function () {
            var example = new customer_1.Customer();
            example.id = "3";
            example.address = "test";
            var result = src_1.SqlTemplateProvider.getDelete(example);
            var expectValue = "DELETE FROM Customer WHERE Id = ? AND Address = ?";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });
    describe("#getDeleteByDynamicQuery", function () {
        it("should get DeleteByDynamicQuery sql template", function () {
            var query = src_1.DynamicQuery.createIntance();
            var idFilter = new src_1.FilterDescriptor(function (u) { return u.id; }, filterOperator_1.FilterOperator.EQUAL, "1");
            var addressFilter = new src_1.FilterDescriptor(function (u) { return u.address; }, filterOperator_1.FilterOperator.START_WITH, "test");
            query.addFilters(idFilter, addressFilter);
            var result = src_1.SqlTemplateProvider.getDeleteByDynamicQuery(customer_1.Customer, query);
            var expectValue = "DELETE FROM Customer WHERE Id = ? AND Address LIKE ?";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
            chai_1.expect("1").to.be.eq(result.params[0]);
            chai_1.expect("test%").to.be.eq(result.params[1]);
        });
    });
    describe("#getUpdateByPk", function () {
        it("should getUpdateByPk sql template", function () {
            var example = new customer_1.Customer();
            example.id = "2";
            example.address = "test";
            var result = src_1.SqlTemplateProvider.getUpdateByPk(example, true);
            var expectValue = "UPDATE Customer SET Address = ? WHERE Id = ?";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
        });
        it("should throw error if don't have key column", function () {
            var test = function () {
                src_1.SqlTemplateProvider.getUpdateByPk(new ErrorModel_1.ErrorModel(), true);
            };
            chai_1.expect(test).to.throw(Error);
        });
    });
    describe("#getSelectByPk", function () {
        it("should getSelectByPk sql template", function () {
            var result = src_1.SqlTemplateProvider.getSelectByPk(customer_1.Customer, "1");
            // tslint:disable-next-line:max-line-length
            var expectValue = "SELECT Id AS id, CompanyName AS company_name, ContactName AS contact_name, ContactTitle AS contact_title, Address AS address, City AS city, Region AS region, PostalCode AS postal_code, Country AS country, Phone AS phone, Fax AS fax FROM Customer WHERE Id = ?";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
        });
        it("should throw error if don't have key column", function () {
            var test = function () {
                src_1.SqlTemplateProvider.getSelectByPk(ErrorModel_1.ErrorModel, "1");
            };
            chai_1.expect(test).to.throw(Error);
        });
    });
    describe("#getSelect", function () {
        it("should getSelect sql template", function () {
            var example = new customer_1.Customer();
            example.id = "1";
            example.address = "test";
            var result = src_1.SqlTemplateProvider.getSelect(example);
            // tslint:disable-next-line:max-line-length
            var expectValue = "SELECT Id AS id, CompanyName AS company_name, ContactName AS contact_name, ContactTitle AS contact_title, Address AS address, City AS city, Region AS region, PostalCode AS postal_code, Country AS country, Phone AS phone, Fax AS fax FROM Customer WHERE Id = ? AND Address = ?";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });
    describe("#getSelectCountByPk", function () {
        it("should getSelectCountByPk", function () {
            var result = src_1.SqlTemplateProvider.getSelectCountByPk(customer_1.Customer, "1");
            var expectValue = "SELECT COUNT(0) FROM Customer WHERE Id = ?";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
        });
        it("should throw error is empty don't have key column", function () {
            var test = function () {
                src_1.SqlTemplateProvider.getSelectCountByPk(ErrorModel_1.ErrorModel, "1");
            };
            chai_1.expect(test).to.throw(Error);
        });
    });
    describe("#getSelectCount", function () {
        it("should getSelectCount sql template", function () {
            var example = new customer_1.Customer();
            example.id = "1";
            example.address = "test";
            var result = src_1.SqlTemplateProvider.getSelectCount(example);
            var expectValue = "SELECT COUNT(0) FROM Customer WHERE Id = ? AND Address = ?";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });
    describe("#getSelectByDynamicQuery", function () {
        it("should getSelectByDynamicQuery sql template", function () {
            var idFilter = new src_1.FilterDescriptor(function (u) { return u.id; }, filterOperator_1.FilterOperator.EQUAL, "1");
            var query = src_1.DynamicQuery.createIntance();
            query.addFilters(idFilter);
            var result = src_1.SqlTemplateProvider.getSelectByDynamicQuery(customer_1.Customer, query);
            // tslint:disable-next-line:max-line-length
            var expectValue = "SELECT Id AS id, CompanyName AS company_name, ContactName AS contact_name, ContactTitle AS contact_title, Address AS address, City AS city, Region AS region, PostalCode AS postal_code, Country AS country, Phone AS phone, Fax AS fax FROM Customer WHERE Id = ?";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });
    describe("#getSelectCountByDynamicQuery", function () {
        it("should getSelectCountByDynamicQuery sql template", function () {
            var idFilter = new src_1.FilterDescriptor(function (u) { return u.id; }, filterOperator_1.FilterOperator.EQUAL, "1");
            var addressFiler = new src_1.FilterDescriptor(function (u) { return u.address; }, filterOperator_1.FilterOperator.START_WITH, "test");
            var query = src_1.DynamicQuery.createIntance();
            query.addFilters(idFilter, addressFiler);
            var result = src_1.SqlTemplateProvider.getSelectCountByDynamicQuery(customer_1.Customer, query);
            var expectValue = "SELECT COUNT(0) FROM Customer WHERE Id = ? AND Address LIKE ?";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });
    describe("#getSelectSql", function () {
        it("should getSelectSql sql template", function () {
            var result = src_1.SqlTemplateProvider.getSelectSql(customer_1.Customer);
            // tslint:disable-next-line:max-line-length
            var expectValue = "SELECT Id AS id, CompanyName AS company_name, ContactName AS contact_name, ContactTitle AS contact_title, Address AS address, City AS city, Region AS region, PostalCode AS postal_code, Country AS country, Phone AS phone, Fax AS fax FROM Customer";
            chai_1.expect(expectValue).to.be.eq(result);
        });
    });
    describe("#getSelectCountSql", function () {
        it("should getSelectCountSql sql template", function () {
            var result = src_1.SqlTemplateProvider.getSelectCountSql(customer_1.Customer);
            var expectValue = "SELECT COUNT(0) FROM Customer";
            chai_1.expect(expectValue).to.be.eq(result);
        });
    });
    describe("#getSqlByDynamicQuery", function () {
        it("should return sql if dynamic query is null", function () {
            var result = src_1.SqlTemplateProvider.getSqlByDynamicQuery(customer_1.Customer, "SELECT * FROM Customer", null);
            var expectValue = "SELECT * FROM Customer";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
        });
        it("should return sql with filter and order if dynamic query has filter and sort", function () {
            var addressFilter = new src_1.FilterDescriptor(function (u) { return u.address; }, filterOperator_1.FilterOperator.START_WITH, "test");
            var idSort = new model_1.SortDescriptor(function (u) { return u.id; }, sortDirection_1.SortDirection.DESC);
            var query = src_1.DynamicQuery.createIntance();
            query.addFilters(addressFilter);
            query.addSorts(idSort);
            // tslint:disable-next-line:max-line-length
            var result = src_1.SqlTemplateProvider.getSqlByDynamicQuery(customer_1.Customer, "SELECT * FROM Customer", query);
            var expectValue = "SELECT * FROM Customer WHERE Address LIKE ? ORDER BY Id DESC";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
            chai_1.expect("test%").to.be.eq(result.params[0]);
        });
    });
    describe("#getColumnsExpression", function () {
        it("shoud getColumnExpression sql template", function () {
            var result = src_1.SqlTemplateProvider.getColumnsExpression(customer_1.Customer);
            // tslint:disable-next-line:max-line-length
            var expectValue = "Id AS id, CompanyName AS company_name, ContactName AS contact_name, ContactTitle AS contact_title, Address AS address, City AS city, Region AS region, PostalCode AS postal_code, Country AS country, Phone AS phone, Fax AS fax";
            chai_1.expect(expectValue).to.be.eq(result);
        });
        it("should has error if entity is null", function () {
            var test = function () {
                src_1.SqlTemplateProvider.getColumnsExpression(null);
            };
            chai_1.expect(test).to.throw(Error);
        });
    });
    describe("#getColumnInfos", function () {
        it("should get columnInfos", function () {
            var columnInfos = src_1.SqlTemplateProvider.getColumnInfos(customer_1.Customer);
            chai_1.expect(true).to.be.eq(columnInfos.length > 0);
            chai_1.expect("Id").to.be.eq(columnInfos[0].columnName);
        });
        it("should has error if entity is null", function () {
            var test = function () {
                src_1.SqlTemplateProvider.getColumnInfos(null);
            };
            chai_1.expect(test).to.throw(Error);
        });
    });
    // filter
    describe("#getFilterExpressionByFilterDescriptor", function () {
        it("should getFilterExpressionByFilterDescriptor sql template", function () {
            var idFilter = new src_1.FilterDescriptor(function (u) { return u.id; }, filterOperator_1.FilterOperator.EQUAL, "1");
            // tslint:disable-next-line:max-line-length
            var result = src_1.SqlTemplateProvider.getFilterExpressionByFilterDescriptor(customer_1.Customer, idFilter);
            var expectValue = "Id = ?";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
            chai_1.expect("1").to.be.eq(result.params[0]);
        });
    });
    describe("#getFilterExpressionByCustomFilterDescriptor", function () {
        it("should getFilterExpressionByCustomFilterDescriptor sql template", function () {
            var customFilter = new src_1.CustomFilterDescriptor();
            customFilter.expression = "CASE {0} THEN {1} ELSE {2} END";
            customFilter.params = [3, 1, 0];
            var result = src_1.SqlTemplateProvider
                .getFilterExpressionByCustomFilterDescriptor(customer_1.Customer, customFilter);
            var expectValue = "CASE ? THEN ? ELSE ? END";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
            chai_1.expect(3).to.be.eq(result.params[0]);
            chai_1.expect(1).to.be.eq(result.params[1]);
            chai_1.expect(0).to.be.eq(result.params[2]);
        });
    });
    describe("#getFilterExpressionByFilterBase", function () {
        it("should getFilterExpressionByFilterDescriptor sql template", function () {
            var idFilter = new src_1.FilterDescriptor(function (u) { return u.id; }, filterOperator_1.FilterOperator.EQUAL, "1");
            // tslint:disable-next-line:max-line-length
            var result = src_1.SqlTemplateProvider.getFilterExpressionByFilterBase(customer_1.Customer, idFilter);
            var expectValue = "Id = ?";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
            chai_1.expect("1").to.be.eq(result.params[0]);
        });
        it("should getFilterExpressionByCustomFilterDescriptor sql template", function () {
            var customFilter = new src_1.CustomFilterDescriptor();
            customFilter.expression = "CASE {0} THEN {1} ELSE {2} END";
            customFilter.params = [3, 1, 0];
            var result = src_1.SqlTemplateProvider
                .getFilterExpressionByFilterBase(customer_1.Customer, customFilter);
            var expectValue = "CASE ? THEN ? ELSE ? END";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
            chai_1.expect(3).to.be.eq(result.params[0]);
            chai_1.expect(1).to.be.eq(result.params[1]);
            chai_1.expect(0).to.be.eq(result.params[2]);
        });
        it("should getFilterGroupDescriptor sql template", function () {
            var idFilter = new src_1.FilterDescriptor(function (u) { return u.id; }, filterOperator_1.FilterOperator.EQUAL, "1");
            // tslint:disable-next-line:max-line-length
            var addressFilter = new src_1.FilterDescriptor(model_1.FilterCondition.OR, function (u) { return u.address; }, filterOperator_1.FilterOperator.START_WITH, "test");
            var groupFilter = new filterGroupDescriptor_1.FilterGroupDescriptor();
            groupFilter.filters = [idFilter, addressFilter];
            var result = src_1.SqlTemplateProvider.getFilterExpressionByFilterBase(customer_1.Customer, groupFilter);
            var expectValue = "Id = ? OR Address LIKE ?";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
            chai_1.expect("1").to.be.eq(result.params[0]);
            chai_1.expect("test%").to.be.eq(result.params[1]);
        });
        it("should return empty sql template if filter is null", function () {
            var result = src_1.SqlTemplateProvider.getFilterExpressionByFilterBase(customer_1.Customer, null);
            chai_1.expect("").to.be.eq(result.sqlExpression);
        });
    });
    // sort
    describe("#getSortExpressionBySortBase", function () {
        it("should getSortExpressionBySortDescriptor sql template", function () {
            var idSort = new model_1.SortDescriptor(function (u) { return u.id; }, sortDirection_1.SortDirection.DESC);
            var result = src_1.SqlTemplateProvider.getSortExpressionBySortBase(customer_1.Customer, idSort);
            var expectValue = "Id DESC";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
        });
        it("should getSortExpressionByCustomSortDescriptor sql template", function () {
            var customSort = new customSortDescriptor_1.CustomSortDescriptor();
            customSort.expression = "CASE Id = {0} THEN {1} ELSE {2} END";
            customSort.direction = sortDirection_1.SortDirection.DESC;
            customSort.params = [3, 1, 0];
            var result = src_1.SqlTemplateProvider.getSortExpressionBySortBase(customer_1.Customer, customSort);
            var expectValue = "CASE Id = ? THEN ? ELSE ? END";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
            chai_1.expect(3).to.be.eq(result.params[0]);
            chai_1.expect(1).to.be.eq(result.params[1]);
            chai_1.expect(0).to.be.eq(result.params[2]);
        });
        it("should get empty sql template", function () {
            var result = src_1.SqlTemplateProvider.getSortExpressionBySortBase(customer_1.Customer, null);
            chai_1.expect("").to.be.eq(result.sqlExpression);
        });
    });
    describe("#getSortExpressionBySortDescriptor", function () {
        it("should getSortExpressionBySortDescriptor sql template", function () {
            var idSort = new model_1.SortDescriptor(function (u) { return u.id; }, sortDirection_1.SortDirection.DESC);
            var result = src_1.SqlTemplateProvider.getSortExpressionBySortDescriptor(customer_1.Customer, idSort);
            var expectValue = "Id DESC";
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });
    describe("#getSortExpressionByCustomSortDescriptor", function () {
        it("should getSortExpressionByCustomSortDescriptor sql template", function () {
            var customSort = new customSortDescriptor_1.CustomSortDescriptor();
            customSort.expression = "CASE Id = {0} THEN {1} ELSE {2} END";
            customSort.direction = sortDirection_1.SortDirection.DESC;
            customSort.params = [3, 1, 0];
            var result = src_1.SqlTemplateProvider.getSortExpressionByCustomSortDescriptor(customer_1.Customer, customSort);
            var expectValue = "CASE Id = ? THEN ? ELSE ? END";
            chai_1.expect(3).to.be.eq(result.params[0]);
            chai_1.expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });
});
//# sourceMappingURL=sqlTemplateProviderTest.js.map