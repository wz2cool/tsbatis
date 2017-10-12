import { EntityCache } from "./cache/entityCache";
import { column } from "./decorator";
import { FilterCondition, FilterDescriptor, FilterOperator } from "./model";
import { MappingProvider } from "./provider";

export class User {
  @column("id", "user")
  public id: number = 1;
  @column("user_name", "user")
  public userName: string;
  @column("email", "user")
  public email: string;
  @column("mobile", "user")
  public mobile: string;
  @column("password", "user")
  public password: string;
  @column("display_name", "user")
  public displayName: string;
  @column("create_time", "user")
  public createTime: Date;
  @column("update_time", "user")
  public updateTime: Date;
  @column("deleted", "user")
  public deleted: number;
}

const json = `[
    {
      "id": 1,
      "user_name": "frank",
      "email": "wz2cool@live.cn",
      "mobile": "111111",
      "password": "111111",
      "display_name": "frank.wang",
      "create_time": "2017-10-10T16:00:00.000Z",
      "update_time": "2017-10-10T16:00:00.000Z",
      "deleted": 0
    },
    {
      "id": 2,
      "user_name": "marry",
      "email": "mayy@QQ.com",
      "mobile": "222222",
      "password": "222222",
      "display_name": "“”",
      "create_time": "2017-10-10T16:00:00.000Z",
      "update_time": "2017-10-10T16:00:00.000Z",
      "deleted": 0
    }
  ]`;

const dbJson = JSON.parse(json);

const entities: User[] = [];
dbJson.forEach((element) => {
  entities.push(new User());
});

const entities2 = MappingProvider.toEntities<User>(dbJson, new User());
const v = entities2[0].createTime.getDate();
console.log(entities2);
