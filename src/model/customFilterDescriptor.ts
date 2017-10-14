import { FilterDescriptorBase } from "./index";

export class CustomFilterDescriptor<T> extends FilterDescriptorBase {
    public expression: string;
    public params: any[] = [];
}
