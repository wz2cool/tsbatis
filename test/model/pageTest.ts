import { expect } from "chai";
import { Page } from "../../src/model/index";
import { CustomerView } from "../db/views/customerView";

describe(".Page", () => {
    describe("#constructor", () => {
        const entities: CustomerView[] = [];
        const result = new Page<CustomerView>(1, 20, 30, entities);

        expect(1).to.be.eq(result.getPageNum());
        expect(20).to.be.eq(result.getPageSize());
        expect(30).to.be.eq(result.getTotal());
        expect(2).to.be.eq(result.getPages());
        expect(entities).to.be.eq(result.getEntities());
    });
});
