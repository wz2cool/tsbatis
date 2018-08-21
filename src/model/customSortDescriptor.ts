import { SortDescriptorBase } from "ts-dynamic-query";
import { serialize, deserialize } from "class-transformer";

export class CustomSortDescriptor extends SortDescriptorBase {
  public expression: string;
  public params: any[];

  constructor() {
    super("CustomSortDescriptor");
    this.expression = "";
    this.params = [];
  }

  toJSON(): string {
    return serialize(this);
  }

  fromJSON(json: string): CustomSortDescriptor {
    const obj = deserialize(CustomSortDescriptor, json);
    this.expression = obj.expression;
    this.params = obj.params;
    return this;
  }
}
