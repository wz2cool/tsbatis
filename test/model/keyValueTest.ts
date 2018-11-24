import { expect } from "chai";
import { KeyValue } from "../../src/model/keyValue";

describe(".KeyValue", () => {
  describe("#constructor", () => {
    it("init", () => {
      const result = new KeyValue("1", "2");
      expect("1").to.be.eq(result.getKey());
      expect("2").to.be.eq(result.getValue());
    });
  });
});
