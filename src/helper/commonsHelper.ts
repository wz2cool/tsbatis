import * as util from "util";

export class CommonsHelper {
    public static getPropertyName<T>(fn: (o: T) => any): string {
        if (util.isNullOrUndefined(fn)) {
            return "";
        }

        let result = "";
        const expression = fn.toString();
        console.log("expression: ", expression);
        const regexp = new RegExp(`^function.+return\\s+\\w+\.(\\w+)\\s*;\\s*}$`);
        const match = regexp.exec(expression);
        if (match && match.length === 2) {
            result = match[1];
        }

        return result;
    }

    private constructor() {
        // hide constructor.
    }
}
