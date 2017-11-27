import { Entity } from "../model";
export declare class EntityHelper {
    static getPropertyName<T extends Entity>(fn: (o: T) => any): string;
    static getEntityName<T extends Entity>(o: T | {
        new (): T;
    }): string;
    static createObject<T extends Entity>(o: T | {
        new (): T;
    }): T;
    static getEntityClass<T extends Entity>(o: T): {
        new (): T;
    };
    private constructor();
}
