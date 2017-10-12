import { column } from "./decorator";
import { ClassHelper } from "./helper";
import { FilterCondition, FilterDescriptor, FilterOperator } from "./model";

export class User {
    @column("id", "user")
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

const filter = new FilterDescriptor<User>(
    (u) => u.displayName, FilterOperator.EQUAL, 1);
