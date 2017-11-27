export declare class ColumnInfo {
    isPK: boolean;
    insertable: boolean;
    property: string;
    underscoreProperty: string;
    propertyType: string;
    entity: string;
    columnName: string;
    table: string;
    getQueryColumn(): string;
}
