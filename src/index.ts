import { CommonsHelper } from "./helper/commonsHelper";

export class User {
    public id: number;
    public userName: string;
    public email: string;
    public mobile: string;
    public password: string;
    public displayName: string;
    public createTime: Date;
    public updateTime: Date;
    public deleted: number;
}

const result = CommonsHelper.getPropertyName<User>((u) => u.userName);
console.log(result);
