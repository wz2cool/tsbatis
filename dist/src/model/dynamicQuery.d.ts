import { FilterDescriptorBase } from "./filterDescriptorBase";
import { SortDescriptorBase } from "./sortDescritporBase";
export declare class DynamicQuery<T> {
    static createIntance<T>(): DynamicQuery<T>;
    filters: FilterDescriptorBase[];
    sorts: SortDescriptorBase[];
    constructor();
    addFilters(...filters: FilterDescriptorBase[]): DynamicQuery<T>;
    addSorts(...sorts: SortDescriptorBase[]): DynamicQuery<T>;
}
