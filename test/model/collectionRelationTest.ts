import { expect } from "chai";
import { CollectionRelation } from "../../src/index";
import { CustomerView } from "../db/views/customerView";
import { EmployeeView } from "../db/views/employeeView";

describe(".CollectionRelation", () => {
  describe("#constructor", () => {
    it("inital", () => {
      const result = new CollectionRelation<EmployeeView, CustomerView>("customers", "customerId", "id", CustomerView, "");
      expect("customers").to.be.eq(result.getMappingProp());
      expect("customerId").to.be.eq(result.getSourceProp());
      expect("id").to.be.eq(result.getTargetProp());
      expect(CustomerView).to.be.eq(result.getTargetEntityClass());
      expect("").to.be.eq(result.getSelectSql());
      expect(null).to.be.eq(result.getDynamicQuery());
    });
  });
});
