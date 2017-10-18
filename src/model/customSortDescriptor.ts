import { SortDescriptorBase } from "./sortDescritporBase";

export class CustomSortDescriptor extends SortDescriptorBase {
    public expression: string;
    public params: any[];

    constructor() {
        super();
        this.expression = "";
        this.params = [];
    }
}
