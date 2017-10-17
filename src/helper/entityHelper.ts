import { CommonHelper } from "./commonHelper";

export class EntityHelper {
    public static getPropertyName<T>(fn: (o: T) => any): string {
        if (CommonHelper.isNullOrUndefined(fn)) {
            return "";
        }

        const expression = fn.toString();
        const regexp = new RegExp(`^function.+return\\s+\\w+\.(\\w+)\\s*;\\s*}$`);
        const match = regexp.exec(expression);

        if (match && match.length === 2) {
            return match[1];
        } else {
            return "";
        }
    }

    public static getEntityName<T>(o: T | { new(): T }): string {
        if (CommonHelper.isNullOrUndefined(o)) {
            return "";
        }

        const testObj = typeof o === "function" ? new o() : o;
        if (testObj.constructor && (testObj.constructor as any).name) {
            return (testObj.constructor as any).name;
        }

        return "";
    }

    private constructor() {
        // hide constructor.
    }
}
