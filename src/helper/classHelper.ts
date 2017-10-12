import * as util from "util";

export class ClassHelper {
    public static getPropertyName<T>(fn: (o: T) => any): string {
        if (util.isNullOrUndefined(fn)) {
            return "";
        }

        const expression = fn.toString();
        const regexp = new RegExp(`^function.+return\\s+\\w+\.(\\w+)\\s*;\\s*}$`);
        const match = regexp.exec(expression);

        return (match && match.length === 2) ? match[1] : "";
    }

    private constructor() {
        // hide constructor.
    }
}
