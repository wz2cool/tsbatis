import { expect } from "chai";
import { DynamicQuery, FilterOperator } from "ts-dynamic-query";
import { AssociationRelation } from "../../src/model/associationRelation";
import { FilterDescriptor } from "ts-dynamic-query";
import { CustomerView } from "../db/views/customerView";
import { OrderView } from "../db/views/orderView";

describe(".AssociationRelation", () => {
  describe("#constructor", () => {
    it("inital", () => {
      const idFilter = new FilterDescriptor<CustomerView>({ propertyPath: "id", operator: FilterOperator.GREATER_THAN, value: "3" });
      const query = new DynamicQuery<CustomerView>();
      query.addFilters([idFilter]);
      const result = new AssociationRelation<OrderView, CustomerView>(
        "customer",
        "customerId",
        "id",
        CustomerView,
        // tslint:disable-next-line:max-line-length
        "SELECT id AS Id, companyName AS CompanyName, contactName AS ConstactName, contactTitle AS ContactTitle FROM customer",
        query,
      );

      expect("customer").to.be.eq(result.getMappingProp());
      expect("customerId").to.be.eq(result.getSourceProp());
      expect("id").to.be.eq(result.getTargetProp());
      expect(CustomerView).to.be.eq(result.getTargetEntityClass());
      // tslint:disable-next-line:max-line-length
      expect("SELECT id AS Id, companyName AS CompanyName, contactName AS ConstactName, contactTitle AS ContactTitle FROM customer").to.be.eq(
        result.getSelectSql(),
      );
      expect(query).to.be.eq(result.getDynamicQuery());
    });
  });
});
