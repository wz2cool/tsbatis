import { FilterDescriptorBase } from "./filterDescriptorBase";
import { SortDescriptorBase } from "./sortDescritporBase";

export class DynamicQuery<T> {
    public static createIntance<T>(): DynamicQuery<T> {
        return new DynamicQuery<T>();
    }

    public filters: FilterDescriptorBase[];
    public sorts: SortDescriptorBase[];
    constructor() {
        this.filters = [];
        this.sorts = [];
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
