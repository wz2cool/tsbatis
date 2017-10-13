import { EntityCache } from "../cache";
import { EntityHelper } from "../helper";

export class MappingProvider {
    public static toEntities<T>(entity: { new(): T }, dbObjs: any[]): T[] {
        const result: T[] = [];
        dbObjs.forEach((dbObj) => {
            const entityObj = MappingProvider.toEntity(new entity(), dbObj);
            result.push(entityObj);
        });
        return result;
    }

    private static toEntity<T>(entityExample: T, dbObj: any): T {
        const cache = EntityCache.getInstance();
        const entityName = EntityHelper.getEntityName(entityExample);
        const properties = cache.getProperties(entityName);
        properties.forEach((prop) => {
            const columnInfo = cache.getColumnInfo(entityName, prop);
            if (columnInfo
                && dbObj.hasOwnProperty(columnInfo.underscoreProperty)) {
                const dbValue = dbObj[columnInfo.underscoreProperty];
                const propertType = columnInfo.propertyType;
                const propertValue = MappingProvider.toPropertyValue(dbValue, propertType);
                entityExample[prop] = propertValue;
            }
        });
        return entityExample;
    }

    private static toPropertyValue(dbValue: any, propertyType: string): any {
        const usePropType = propertyType.toLocaleLowerCase();
        switch (usePropType) {
            case "number":
                return Number(dbValue);
            case "string":
                // fix “” issue
                return String(dbValue).replace("“”", "");
            case "boolean":
                return Boolean(dbValue);
            case "date":
                return new Date(dbValue);
            default:
                return dbValue;
        }
    }

    private constructor() {
        // hide constructor.
    }
}
