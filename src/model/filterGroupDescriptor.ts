import { FilterDescriptorBase } from "./filterDescriptorBase";

export class FilterGroupDescriptor extends FilterDescriptorBase {
    public filters: FilterDescriptorBase[];
    constructor() {
        super();
        this.filters = [];
    }
}
