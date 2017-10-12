import * as util from "util";

export class ClassHelper {
    public static getPropertyName<T>(fn: (o: T) => any): string {
        if (util.isNullOrUndefined(fn)) {
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

    private constructor() {
        // hide constructor.
    }
}
