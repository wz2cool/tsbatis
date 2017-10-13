export interface ISqlQuery {
    query(sql: string, params: any[]): Promise<any>;
}
