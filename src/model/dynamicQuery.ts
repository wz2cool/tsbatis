import { FilterDescriptorBase, SortDescriptorBase } from "./index";

export class DynamicQuery<T> {
    public static createIntance<T>(): DynamicQuery<T> {
        return new DynamicQuery<T>();
    }

    private filters: FilterDescriptorBase[] = [];
    private sorts: SortDescriptorBase[] = [];
    private constructor() {
        // hide
    }

    public addFilters(...filters: FilterDescriptorBase[]): DynamicQuery<T> {
        this.filters = this.filters.concat(filters);
        return this;
    }

    public addSorts(...sorts: SortDescriptorBase[]): DynamicQuery<T> {
        this.sorts = this.sorts.concat(sorts);
        return this;
    }
}
