import { CustomSortDescriptor } from '../../src/model/customSortDescriptor';
import { expect } from "chai";
import * as path from "path";
import { DynamicQuery, FilterDescriptor, SqlTemplateProvider } from "../../src";
import { MysqlConnection, SqliteConnection } from "../../src/connection";
import { DatabaseType, SqliteConnectionConfig, SortDescriptor } from "../../src/model";
import { RowBounds } from "../../src/model/rowBounds";
import { Customer } from "../db/entity/customer";
import { SqlTemplate } from "../../src/model/sqlTemplate";
import { FilterOperator } from "../../src/model/filterOperator";
import { SortDirection } from "../../src/model/sortDirection";

describe(".SqlTemplateProvider", () => {
    describe("#getPkColumn", () => {
        it("should return 'id' if pk is 'id'", () => {
            const result = SqlTemplateProvider.getPkColumn<Customer>(new Customer());
            expect("id").to.be.eq(result.property);
        });
    });

    describe("#getInsert", () => {
        it("should get insert sql template", () => {
            const newCustomer = new Customer();
            newCustomer.id = "1";
            newCustomer.companyName = "test";
            newCustomer.contactName = "test";
            newCustomer.contactTitle = "test";
            const result = SqlTemplateProvider.getInsert(newCustomer, false);
            expect("INSERT INTO Customer (Id, CompanyName, ContactName, ContactTitle, " +
                "Address, City, Region, PostalCode, Country, Phone, Fax) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").to.be.eq(result.sqlExpression);
        });

        it("should insertSelective sql template", () => {
            const newCustomer = new Customer();
            newCustomer.id = "1";
            newCustomer.companyName = "test";
            newCustomer.contactName = "test";
            newCustomer.contactTitle = "test";
            const result = SqlTemplateProvider.getInsert(newCustomer, true);
            expect("INSERT INTO Customer (Id, CompanyName, ContactName, ContactTitle) " +
                "VALUES (?, ?, ?, ?)").to.be.eq(result.sqlExpression);
        });
    });

    describe("#getDeleteByPk", () => {
        it("should get deleteBypk sql template", () => {
            const result = SqlTemplateProvider.getDeleteByPk<Customer>(Customer, "2");
            const expectValue = `DELETE FROM Customer WHERE Id = ?`;
            expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });

    describe("#getDelete", () => {
        it("should get delete sql template", () => {
            const example = new Customer();
            example.id = "3";
            example.address = "test";
            const result = SqlTemplateProvider.getDelete(example);
            const expectValue = `DELETE FROM Customer WHERE Id = ? AND Address = ?`;
            expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });

    describe("#getDeleteByDynamicQuery", () => {
        it("should get DeleteByDynamicQuery sql template", () => {
            const query = DynamicQuery.createIntance<Customer>();
            const idFilter = new FilterDescriptor<Customer>((u) => u.id, FilterOperator.EQUAL, "1");
            const addressFilter = new FilterDescriptor<Customer>((u) => u.address, FilterOperator.START_WITH, "test");
            query.addFilters(idFilter, addressFilter);
            const result = SqlTemplateProvider.getDeleteByDynamicQuery<Customer>(Customer, query);
            const expectValue = `DELETE FROM Customer WHERE Id = ? AND Address LIKE ?`;
            expect(expectValue).to.be.eq(result.sqlExpression);
            expect("1").to.be.eq(result.params[0]);
            expect("test%").to.be.eq(result.params[1]);
        });
    });

    describe("#getUpdateByPk", () => {
        it("should getUpdateByPk sql template", () => {
            const example = new Customer();
            example.id = "2";
            example.address = "test";
            const result = SqlTemplateProvider.getUpdateByPk(example, true);
            const expectValue = `UPDATE Customer SET Address = ? WHERE Id = ?`;
            expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });

    describe("#getSelectByPk", () => {
        it("should getSelectByPk sql template", () => {
            const result = SqlTemplateProvider.getSelectByPk<Customer>(Customer, "1");
            // tslint:disable-next-line:max-line-length
            const expectValue = `SELECT Id AS id, CompanyName AS company_name, ContactName AS contact_name, ContactTitle AS contact_title, Address AS address, City AS city, Region AS region, PostalCode AS postal_code, Country AS country, Phone AS phone, Fax AS fax FROM Customer WHERE Id = ?`;
            expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });

    describe("#getSelect", () => {
        it("should getSelect sql template", () => {
            const example = new Customer();
            example.id = "1";
            example.address = "test";
            const result = SqlTemplateProvider.getSelect(example);
            // tslint:disable-next-line:max-line-length
            const expectValue = `SELECT Id AS id, CompanyName AS company_name, ContactName AS contact_name, ContactTitle AS contact_title, Address AS address, City AS city, Region AS region, PostalCode AS postal_code, Country AS country, Phone AS phone, Fax AS fax FROM Customer WHERE Id = ? AND Address = ?`;
            expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });

    describe("#getSelectCountByPk", () => {
        it("should getSelectCountByPk", () => {
            const result = SqlTemplateProvider.getSelectCountByPk<Customer>(Customer, "1");
            const expectValue = `SELECT COUNT(0) FROM Customer WHERE Id = ?`;
            expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });

    describe("#getSelectCount", () => {
        it("should getSelectCount sql template", () => {
            const example = new Customer();
            example.id = "1";
            example.address = "test";
            const result = SqlTemplateProvider.getSelectCount(example);
            const expectValue = `SELECT COUNT(0) FROM Customer WHERE Id = ? AND Address = ?`;
            expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });

    describe("#getSelectByDynamicQuery", () => {
        it("should getSelectByDynamicQuery sql template", () => {
            const idFilter = new FilterDescriptor<Customer>((u) => u.id, FilterOperator.EQUAL, "1");
            const query = DynamicQuery.createIntance<Customer>();
            query.addFilters(idFilter);
            const result = SqlTemplateProvider.getSelectByDynamicQuery<Customer>(Customer, query);
            // tslint:disable-next-line:max-line-length
            const expectValue = `SELECT Id AS id, CompanyName AS company_name, ContactName AS contact_name, ContactTitle AS contact_title, Address AS address, City AS city, Region AS region, PostalCode AS postal_code, Country AS country, Phone AS phone, Fax AS fax FROM Customer WHERE Id = ?`;
            expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });

    describe("#getSelectCountByDynamicQuery", () => {
        it("should getSelectCountByDynamicQuery sql template", () => {
            const idFilter = new FilterDescriptor<Customer>((u) => u.id, FilterOperator.EQUAL, "1");
            const addressFiler = new FilterDescriptor<Customer>((u) => u.address, FilterOperator.START_WITH, "test");
            const query = DynamicQuery.createIntance<Customer>();
            query.addFilters(idFilter, addressFiler);
            const result = SqlTemplateProvider.getSelectCountByDynamicQuery<Customer>(Customer, query);
            const expectValue = `SELECT COUNT(0) FROM Customer WHERE Id = ? AND Address LIKE ?`;
            expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });

    describe("#getSelectSql", () => {
        it("should getSelectSql sql template", () => {
            const result = SqlTemplateProvider.getSelectSql<Customer>(Customer);
            // tslint:disable-next-line:max-line-length
            const expectValue = `SELECT Id AS id, CompanyName AS company_name, ContactName AS contact_name, ContactTitle AS contact_title, Address AS address, City AS city, Region AS region, PostalCode AS postal_code, Country AS country, Phone AS phone, Fax AS fax FROM Customer`;
            expect(expectValue).to.be.eq(result);
        });
    });

    describe("#getSelectCountSql", () => {
        it("should getSelectCountSql sql template", () => {
            const result = SqlTemplateProvider.getSelectCountSql<Customer>(Customer);
            const expectValue = `SELECT COUNT(0) FROM Customer`;
            expect(expectValue).to.be.eq(result);
        });
    });

    describe("#getSqlByDynamicQuery", () => {
        it("should return sql if dynamic query is null", () => {
            const result = SqlTemplateProvider.getSqlByDynamicQuery<Customer>(Customer, "SELECT * FROM Customer", null);
            const expectValue = `SELECT * FROM Customer`;
            expect(expectValue).to.be.eq(result.sqlExpression);
        });

        it("should return sql with filter and order if dynamic query has filter and sort", () => {
            const addressFilter = new FilterDescriptor<Customer>((u) => u.address, FilterOperator.START_WITH, "test");
            const idSort = new SortDescriptor<Customer>((u) => u.id, SortDirection.DESC);
            const query = DynamicQuery.createIntance<Customer>();
            query.addFilters(addressFilter);
            query.addSorts(idSort);

            // tslint:disable-next-line:max-line-length
            const result = SqlTemplateProvider.getSqlByDynamicQuery<Customer>(Customer, "SELECT * FROM Customer", query);
            const expectValue = `SELECT * FROM Customer WHERE Address LIKE ? ORDER BY Id DESC`;
            expect(expectValue).to.be.eq(result.sqlExpression);
            expect("test%").to.be.eq(result.params[0]);
        });
    });

    // sort
    describe("#getSortExpressionBySortBase", () => {
        it("should getSortExpressionBySortDescriptor sql template", () => {
            const idSort = new SortDescriptor<Customer>((u) => u.id, SortDirection.DESC);
            const result = SqlTemplateProvider.getSortExpressionBySortBase<Customer>(Customer, idSort);
            const expectValue = `Id DESC`;
            expect(expectValue).to.be.eq(result.sqlExpression);
        });

        it("should getSortExpressionByCustomSortDescriptor sql template", () => {
            const customSort = new CustomSortDescriptor();
            customSort.expression = "CASE Id = {0} THEN {1} ELSE {2} END";
            customSort.direction = SortDirection.DESC;
            customSort.params = [3, 1, 0];
            const result = SqlTemplateProvider.getSortExpressionBySortBase<Customer>(Customer, customSort);
            const expectValue = "CASE Id = ? THEN ? ELSE ? END";
            expect(expectValue).to.be.eq(result.sqlExpression);
            expect(3).to.be.eq(result.params[0]);
            expect(1).to.be.eq(result.params[1]);
            expect(0).to.be.eq(result.params[2]);
        });
    });

    describe("#getSortExpressionBySortDescriptor", () => {
        it("should getSortExpressionBySortDescriptor sql template", () => {
            const idSort = new SortDescriptor<Customer>((u) => u.id, SortDirection.DESC);
            const result = SqlTemplateProvider.getSortExpressionBySortDescriptor<Customer>(Customer, idSort);
            const expectValue = `Id DESC`;
            expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });

    describe("#getSortExpressionByCustomSortDescriptor", () => {
        it("should getSortExpressionByCustomSortDescriptor sql template", () => {
            const customSort = new CustomSortDescriptor();
            customSort.expression = "CASE Id = {0} THEN {1} ELSE {2} END";
            customSort.direction = SortDirection.DESC;
            customSort.params = [3, 1, 0];
            const result = SqlTemplateProvider.getSortExpressionByCustomSortDescriptor<Customer>(Customer, customSort);
            const expectValue = "CASE Id = ? THEN ? ELSE ? END";
            expect(3).to.be.eq(result.params[0]);
            expect(expectValue).to.be.eq(result.sqlExpression);
        });
    });
});
