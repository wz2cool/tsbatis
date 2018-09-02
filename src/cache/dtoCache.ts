import * as _ from "lodash";
import { CommonHelper } from "../helper/commonHelper";
import { DtoFieldInfo } from "../model/dtoFieldInfo";

export class DtoCache {
    public static getInstance() {
        return this.instance;
    }

    private static instance = new DtoCache();
    public readonly fieldCache: { [dtoObjectName: string]: { [property: string]: DtoFieldInfo } } = {};
    private constructor() {
        // hide constructor
    }

    public cacheFieldInfo(dtoFieldInfo: DtoFieldInfo): void {
        let propFieldMap = this.fieldCache[dtoFieldInfo.dtoObjectName];
        if (CommonHelper.isNullOrUndefined(propFieldMap)) {
            propFieldMap = {};
            propFieldMap[dtoFieldInfo.property] = dtoFieldInfo;
            this.fieldCache[dtoFieldInfo.dtoObjectName] = propFieldMap;
        } else {
            propFieldMap[dtoFieldInfo.property] = dtoFieldInfo;
        }
    }

    public getFieldInfos(dtoObjectName: string): DtoFieldInfo[] {
        const propFieldMap = this.fieldCache[dtoObjectName];
        if (CommonHelper.isNullOrUndefined(propFieldMap)) {
            return [];
        }
        return _.values(propFieldMap);
    }
}
