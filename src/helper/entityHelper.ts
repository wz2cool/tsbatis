import { ObjectUtils } from "ts-commons";
import { Entity } from "../model";

export class EntityHelper {
  public static getTargetConstrutor<T extends Entity>(o: T | { new (): T }): Function {
    if (ObjectUtils.isNullOrUndefined(o)) {
      return null;
    }

    const testObj = this.createObject(o);
    return testObj.constructor;
  }

  public static createObject<T extends Entity>(o: T | { new (): T }): T {
    if (o instanceof Function) {
      return new o();
    } else {
      const type = o.constructor as { new (): T };
      return new type();
    }
  }

  public static getEntityClass<T extends Entity>(o: T): { new (): T } {
    return o.constructor as { new (): T };
  }

  private constructor() {
    // hide constructor.
  }
}
