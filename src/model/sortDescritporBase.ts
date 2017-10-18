import { SortDirection } from "./sortDirection";

export abstract class SortDescriptorBase {
    public direction: SortDirection;
    constructor() {
        this.direction = SortDirection.ASC;
    }
}
