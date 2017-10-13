export interface ISqlQuery {
    query(sql: string, params: any[], callback: (err: any, result?: any) => void);
}
