import { expect } from "chai";
import { SortDescriptor, SortDirection } from "ts-dynamic-query";
import { Student } from "./student";

describe(".SortDescriptor", () => {
  describe("#constructor", () => {
    it("constructor", () => {
      const sort = new SortDescriptor<Student>({ propertyPath: "age" });
      expect(SortDirection.ASC).to.be.eq(sort.direction);
      expect("age").to.be.eq(sort.propertyPath);
    });
  });
});
