import * as util from "util";

export class CommonsHelper {
    public static getPropertyName<T>(fn: (o: T) => any): string {
        if (util.isNullOrUndefined(fn)) {
            return "";
        }

        let result = "";
        const expression = fn.toString();
        const splitted = expression.split(".");
        if (splitted.length === 2) {
            result = splitted[1].replace(";", "").replace("}", "").trim();
        }
        return result;
    }

    private constructor() {
        // hide constructor.
    }
}
