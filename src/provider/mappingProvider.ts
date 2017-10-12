import { EntityCache } from "../cache";
import { EntityHelper } from "../helper";

export class MappingProvider {
    public static toEntity<T>(entity: T, dbJson: any): T {
        const cache = EntityCache.getInstance();
        const dbObj = (typeof dbJson === "string") ? JSON.parse(dbJson) : dbJson;
        const entityName = EntityHelper.getEntityName(entity);

        for (const prop in entity) {
            if (entity.hasOwnProperty(prop)) {
                const columnInfo = cache.getColumnInfo(entityName, prop);
                if (dbJson.hasOwnProperty(columnInfo.columnName)) {
                    entity[prop] = dbJson[columnInfo.columnName];
                }
            }
        }

        return entity;
    }

    public static toEntities<T>(entities: T[], dbJsons: any[]): T[] {
        if (entities.length !== dbJsons.length) {
            throw new Error("should perpare entities");
        }

        for (let i = 0; i < dbJsons.length; i++) {
            const dbJson = dbJsons[i];
            const entity = entities[i];
            MappingProvider.toEntity(entity, dbJson);
        }
        return entities;
    }
}
