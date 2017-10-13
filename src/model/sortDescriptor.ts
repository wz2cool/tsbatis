import { EntityHelper } from "../helper";
import { SortDescriptorBase, SortDirection } from "./index";

export class SortDescriptor<T> extends SortDescriptorBase {
    public propertyPath: string;

    constructor(getPropFun: (t: T) => any, direction: SortDirection = SortDirection.ASC) {
        super(direction);
        this.propertyPath = EntityHelper.getPropertyName<T>(getPropFun);
    }
}
