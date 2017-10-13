export class CommonHelper {
    public static isNullOrUndefined(value: any): boolean {
        return value === null
            || typeof value === "undefined";
    }

    private constructor() {
        // hide constructor
    }
}
