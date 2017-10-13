import { EntityCache } from "./cache/entityCache";
import { User } from "./db/user";
import { UserDao } from "./db/userDao";
import { column } from "./decorator";
import { FilterCondition, FilterDescriptor, FilterOperator } from "./model";
import { MappingProvider } from "./provider";
// class User {
//   @column("id", "user", true)
//   public id: number = 1;
//   @column("user_name", "user")
//   public userName: string;
//   @column("email", "user")
//   public email: string;
//   @column("mobile", "user")
//   public mobile: string;
//   @column("password", "user")
//   public password: string;
//   @column("display_name", "user")
//   public displayName: string;
//   @column("create_time", "user")
//   public createTime: Date;
//   @column("update_time", "user")
//   public updateTime: Date;
//   @column("deleted", "user")
//   public deleted: number;
// }

// const json = `[
//     {
//       "id": 1,
//       "user_name": "frank",
//       "email": "wz2cool@live.cn",
//       "mobile": "111111",
//       "password": "111111",
//       "display_name": "frank.wang",
//       "create_time": "2017-10-10T16:00:00.000Z",
//       "update_time": "2017-10-10T16:00:00.000Z",
//       "deleted": 0
//     },
//     {
//       "id": 2,
//       "user_name": "marry",
//       "email": "mayy@QQ.com",
//       "mobile": "222222",
//       "password": "222222",
//       "display_name": "“”",
//       "create_time": "2017-10-10T16:00:00.000Z",
//       "update_time": "2017-10-10T16:00:00.000Z",
//       "deleted": 0
//     }
//   ]`;

// const dbJson = JSON.parse(json);
// const entities2 = MappingProvider.toEntities<User>(User, dbJson);
// const v = entities2[0].createTime.getDate();
// console.log(entities2);

// const value = EntityCache.getInstance().getColumnInfos("User");

// console.log(value);

const user = new User();
user.userName = "frank1";
user.password = "innodealing";

const userDao = new UserDao();
userDao.insertSelective(user, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});
