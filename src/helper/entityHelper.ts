import { Entity } from "../model";
import { ObjectUtils } from "ts-commons";

export class EntityHelper {
  public static getPropertyName<T extends Entity>(fn: (o: T) => any): string {
    if (ObjectUtils.isNullOrUndefined(fn)) {
      return "";
    }

    const expression = fn.toString();
    const returnIndex = expression.indexOf("return");
    if (returnIndex > -1) {
      const newExpression = expression.substring(returnIndex, expression.length - 1);
      const regexp = new RegExp(`^return\\s+\\w+\.(\\w+)\\s*;\\s*$`);
      const match = regexp.exec(newExpression);

      if (match && match.length === 2) {
        return match[1];
      } else {
        return "";
      }
    } else {
      const regexp = new RegExp(`^\\s*\\(?\\w+\\)?\\s*=>\\s*\\w+\\.(\\w+)\\s*$`);
      const match = regexp.exec(expression);

      if (match && match.length === 2) {
        return match[1];
      } else {
        return "";
      }
    }
  }

  public static getTargetConstrutor<T extends Entity>(o: T | { new (): T }): Function {
    if (ObjectUtils.isNullOrUndefined(o)) {
      return null;
    }

    const testObj = typeof o === "function" ? new o() : o;
    return testObj.constructor;
  }

  public static createObject<T extends Entity>(o: T | { new (): T }): T {
    if (typeof o === "function") {
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
