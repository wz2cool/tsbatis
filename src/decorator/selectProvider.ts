import * as lodash from "lodash";
import "reflect-metadata";
import { EntityCache } from "../cache/entityCache";
import { CommonHelper } from "../helper";
import { ColumnInfo } from "../model/columnInfo";

export function selectProvider(name: string, a2?, a3?) {
    const cache = EntityCache.getInstance();
    return (target: any, propertyKey: string) => {

    };
}
