import { EntityHelper } from "../helper";
import { Entity } from "./entity";
import { SortDescriptorBase } from "./sortDescritporBase";
import { SortDirection } from "./sortDirection";

export class SortDescriptor<T extends Entity> extends SortDescriptorBase {
    public propertyPath: string;

    constructor(getPropFun: (t: T) => any, direction: SortDirection = SortDirection.ASC) {
        super();
        this.direction = direction;
        this.propertyPath = EntityHelper.getPropertyName<T>(getPropFun);
    }
}
