import { FilterCondition } from "./filterCondition";

export abstract class FilterDescriptorBase {
    public condition: FilterCondition = FilterCondition.AND;
}
