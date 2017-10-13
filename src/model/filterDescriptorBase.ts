import { FilterCondition } from "./index";

export abstract class FilterDescriptorBase {
    public condition: FilterCondition = FilterCondition.AND;
}
