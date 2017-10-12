import { EntityCache } from "./cache/entityCache";
import { column } from "./decorator";
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

console.log(EntityCache.getInstance().getColumnInfos("User"));
console.log("hello");
const filter = new FilterDescriptor<User>((u) => u.displayName, FilterOperator.EQUAL, "frank");

console.log(filter);

const v = User.getEntityName<User>((o) => o.id);
