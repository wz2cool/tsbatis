import { deserialize, serialize } from "class-transformer";
import { FilterDescriptorBase } from "ts-dynamic-query";

export class CustomFilterDescriptor extends FilterDescriptorBase {
  public expression: string;
  public params: any[];

  constructor() {
    super("CustomFilterDescriptor");
    this.expression = "";
    this.params = [];
  }

  public toJSON(): string {
    return serialize(this);
  }

  public fromJSON(json: string): CustomFilterDescriptor {
    const obj = deserialize(CustomFilterDescriptor, json);
    this.expression = obj.expression;
    this.params = obj.params;
    return this;
  }
}
