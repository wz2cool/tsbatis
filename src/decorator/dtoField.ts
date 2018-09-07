import "reflect-metadata";
import { DtoCache } from "../cache/dtoCache";
import { DtoFieldInfo } from "../model/dtoFieldInfo";
import { ObjectUtils, StringUtils } from "ts-commons";

export function dtoField(name?: string) {
  const cache = DtoCache.getInstance();
  return (target: any, propertyKey: string) => {
    if (
      ObjectUtils.isNullOrUndefined(target) ||
      ObjectUtils.isNullOrUndefined(target.constructor) ||
      ObjectUtils.isNullOrUndefined(target.constructor.name)
    ) {
      throw new Error("cannot find entity from target.constructor.name");
    }

    const fieldName = typeof name === "undefined" || StringUtils.isBlank(name) ? propertyKey : name;
    const dtoObjectName = target.constructor.name;
    const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
    const property = propertyKey;
    const dtoFieldInfo = new DtoFieldInfo();
    dtoFieldInfo.dtoObjectName = dtoObjectName;
    dtoFieldInfo.name = fieldName;
    dtoFieldInfo.property = property;
    dtoFieldInfo.propertyType = propertyType.name;
    cache.cacheFieldInfo(dtoFieldInfo);
  };
}
