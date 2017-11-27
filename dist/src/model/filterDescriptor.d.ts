import { Entity } from "./entity";
import { FilterCondition } from "./filterCondition";
import { FilterDescriptorBase } from "./filterDescriptorBase";
import { FilterOperator } from "./filterOperator";
export declare class FilterDescriptor<T extends Entity> extends FilterDescriptorBase {
    operator: FilterOperator;
    propertyPath: string;
    value: any;
    constructor();
    constructor(condition: FilterCondition, getPropFun: (t: T) => any, operator: FilterOperator, value: any);
    constructor(getPropFun: (t: T) => any, operator: FilterOperator, value: any);
}
