import { Entity } from "./entity";
import { SortDescriptorBase } from "./sortDescritporBase";
import { SortDirection } from "./sortDirection";
export declare class SortDescriptor<T extends Entity> extends SortDescriptorBase {
    propertyPath: string;
    constructor(getPropFun: (t: T) => any, direction?: SortDirection);
}
