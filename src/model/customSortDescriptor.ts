import { SortDescriptorBase } from "./index";

export class CustomSortDescriptor extends SortDescriptorBase {
    public expression: string;
    public params: any[] = [];
}
