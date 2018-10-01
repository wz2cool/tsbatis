import { DtoObject } from "../model/dtoObject";
import { ObjectUtils } from "ts-commons";

export class DtoObjectHelper {
  public static getDtoObjectName<T extends DtoObject>(o: T | { new (): T }): string {
    if (ObjectUtils.isNullOrUndefined(o)) {
      return "";
    }

    const testObj = this.createObject(o);
    return (testObj.constructor as any).name;
  }

  public static createObject<T extends DtoObject>(o: T | { new (): T }): T {
    if (typeof o === "function") {
      const type = o as { new (): T };
      return new type();
    } else {
      const type = o.constructor as { new (): T };
      return new type();
    }
  }
}
