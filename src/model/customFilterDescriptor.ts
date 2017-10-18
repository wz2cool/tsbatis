import { FilterDescriptorBase } from "./filterDescriptorBase";

export class CustomFilterDescriptor extends FilterDescriptorBase {
    public expression: string;
    public params: any[];

    constructor() {
        super();
        this.expression = "";
        this.params = [];
    }
}
