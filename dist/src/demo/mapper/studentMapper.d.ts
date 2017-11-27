import { BaseTableMapper } from "../../mapper";
import { Student } from "../entity/table/student";
export declare class StudentMapper extends BaseTableMapper<Student> {
    getEntityClass(): new () => Student;
}
