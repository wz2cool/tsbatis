import { expect } from "chai";
import * as path from "path";
import { SqlTemplateProvider, DynamicQuery, FilterDescriptor } from "../../src";
import { MysqlConnection, SqliteConnection } from "../../src/connection";
import { DatabaseType, SqliteConnectionConfig } from "../../src/model";
import { RowBounds } from "../../src/model/rowBounds";
import { Customer } from "../db/entity/customer";
import { SqlTemplate } from "../../src/model/sqlTemplate";
import { FilterOperator } from "../../src/model/filterOperator";

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
            // SqlTemplateProvider.getSelectByPk()
        });
    });
});
