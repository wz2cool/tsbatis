import { EntityHelper } from "./../helper";
import { FilterCondition, FilterDescriptorBase, FilterOperator } from "./index";

export class FilterDescriptor<T> extends FilterDescriptorBase {
    public operator: FilterOperator = FilterOperator.EQUAL;
    public propertyPath: string = null;
    public value: any = null;

    constructor();
    constructor(
        condition: FilterCondition,
        getPropFun: (t: T) => any,
        operator: FilterOperator,
        value: any);
    constructor(
        getPropFun: (t: T) => any,
        operator: FilterOperator,
        value: any);
    constructor(a1?, a2?, a3?, a4?) {
        super();
        if (!a1) {
            // empty contructor
            return;
        }

        if (typeof a1 === "number") {
            // conditon
            this.condition = a1;
            this.propertyPath = EntityHelper.getPropertyName<T>(a2);
            this.operator = a3;
            this.value = a4;
            return;
        }

        if (typeof a1 === "function") {
            this.propertyPath = EntityHelper.getPropertyName<T>(a1);
            this.operator = a2;
            this.value = a3;
            return;
        }
    }
}
