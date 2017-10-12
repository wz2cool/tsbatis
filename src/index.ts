import { ClassHelper } from "./helper";

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

const result = ClassHelper.getPropertyName<User>((u) => u.userName);
console.log(result);
