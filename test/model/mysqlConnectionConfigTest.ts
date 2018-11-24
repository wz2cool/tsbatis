import { expect } from "chai";
import { DatabaseType } from "../../src/index";
import { MysqlConnectionConfig } from "../../src/model/index";

describe(".MysqlConnectionConfig", () => {
  describe("#constructor", () => {
    it("init", () => {
      const result = new MysqlConnectionConfig();

      expect(3306).to.be.eq(result.port);
      expect(DatabaseType.MYSQL).to.be.eq(result.getDatabaseType());
    });
  });
});
