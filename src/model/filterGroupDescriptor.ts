import { FilterDescriptorBase } from "./index";

export class FilterGroupDescriptor<T> extends FilterDescriptorBase {
    public filters: FilterDescriptorBase[] = [];
}
