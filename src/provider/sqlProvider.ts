import { CommonHelper } from "../helper";
import { ColumnInfo, SqlParam } from "../model";

export class SqlProvider {
    public static getInsert<T>(o: T, columnInfos: ColumnInfo[], selective: boolean): SqlParam {
        const columnNames: string[] = [];
        const placeHolders: string[] = [];
        const params: any[] = [];
        columnInfos.forEach((colInfo) => {
            if (!colInfo.insertable) {
                return;
            }

            const propValue = o[colInfo.property];
            if (selective && CommonHelper.isNullOrUndefined(propValue)) {
                return;
            }

            params.push(CommonHelper.isNullOrUndefined(propValue) ? null : propValue);
            columnNames.push(colInfo.columnName);
            placeHolders.push("?");
        });

        const tableName = columnInfos[0].table;
        const columnNamesStr = columnInfos.join(",");
        const placeholderStr = placeHolders.join(",");
        const sqlExpression = `INSERT INTO ${tableName} (${columnNamesStr}) VALUES (${placeholderStr})`;

        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    }

    private constructor() {
        // hide constructor
    }
}
