import { SortDirection } from "./index";

export abstract class SortDescriptorBase {
    public direction: SortDirection = SortDirection.ASC;
    constructor(direction: SortDirection) {
        this.direction = direction;
    }
}
