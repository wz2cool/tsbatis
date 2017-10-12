import { ClassHelper } from "./../helper";
import { FilterCondition } from "./filterCondition";
import { FilterOperator } from "./filterOperator";

export class FilterDescriptor<T> {
    public condition: FilterCondition = FilterCondition.AND;
    public operator: FilterOperator = FilterOperator.EQUAL;
    public propertyPath: string;
    public value: boolean | number | string;

    public constructor(
        condition?: FilterCondition,
        getPropFun?: (t: T) => any,
        operator?: FilterOperator,
        value?: boolean | number | string) {
        if (condition) {
            this.condition = condition;
        }
        if (getPropFun) {
            this.propertyPath = ClassHelper.getPropertyName<T>(getPropFun);
        }
        if (operator) {
            this.operator = operator;
        }
        if (value) {
            this.value = value;
        }
    }
}
