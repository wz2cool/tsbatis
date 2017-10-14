import { FilterDescriptorBase } from "./index";

export class CustomFilterDescriptor extends FilterDescriptorBase {
    public expression: string;
    public params: any[] = [];
}
