export class EntityHelper {
    public static getPropertyName<T>(fn: (o: T) => any): string {
        if (!fn) {
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

    public static getEntityName<T>(o: T): string {
        if (!o) {
            return "";
        }

        if (o.constructor && (o.constructor as any).name) {
            return (o.constructor as any).name;
        }

        return "";
    }

    private constructor() {
        // hide constructor.
    }
}
