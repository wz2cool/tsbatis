import "reflect-metadata";
import { DtoCache } from "../cache/dtoCache";
import { CommonHelper } from "../helper/commonHelper";
import { DtoFieldInfo } from "../model/dtoFieldInfo";

export function dtoField(name?: string) {
    const cache = DtoCache.getInstance();
    return (target: any, propertyKey: string) => {
        if (CommonHelper.isNullOrUndefined(target)
            || CommonHelper.isNullOrUndefined(target.constructor)
            || CommonHelper.isNullOrUndefined(target.constructor.name)) {
            throw new Error("cannot find entity from target.constructor.name");
        }

        const fieldName = typeof name === "undefined" || CommonHelper.isBlank(name)
            ? propertyKey : name;
        const dtoObjectName = target.constructor.name;
        const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
        const property = propertyKey;
        const dtoFieldInfo = new DtoFieldInfo();
        dtoFieldInfo.dtoObjectName = dtoObjectName;
        dtoFieldInfo.name = fieldName;
        dtoFieldInfo.property = propertyKey;
        dtoFieldInfo.propertyType = propertyType.name;
        cache.cacheFieldInfo(dtoFieldInfo);
    };
}
