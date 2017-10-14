export class CommonHelper {
    public static isNullOrUndefined(value: any): boolean {
        return value === null
            || typeof value === "undefined";
    }

    public static isBlank(value: string): boolean {
        return CommonHelper.isNullOrUndefined(value)
            || value.trim() === "";
    }

    public static isNotBlank(value: string): boolean {
        return !CommonHelper.isBlank(value);
    }

    private constructor() {
        // hide constructor
    }
}
