import { SortDirection } from "./sortDirection";

export abstract class SortDescriptorBase {
    public direction: SortDirection = SortDirection.ASC;
}
