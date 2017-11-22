import { column, TableEntity } from "../../../src/";

export class Employee extends TableEntity {
    @column("Id", true, true)
    public id: number;
    @column("LastName", false, true)
    public lastName: string;
    @column("FirstName", false, true)
    public firstName: string;
    @column("Title", false, true)
    public title: string;
    @column("TitleOfCourtesy", false, true)
    public titleOfCourtesy: string;
    @column("BirthDate", false, true)
    public birthDate: string;
    @column("HireDate", false, true)
    public hireDate: string;
    @column("Address", false, true)
    public address: string;
    @column("City", false, true)
    public city: string;
    @column("Region", false, true)
    public region: string;
    @column("PostalCode", false, true)
    public postalCode: string;
    @column("Country", false, true)
    public country: string;
    @column("HomePhone", false, true)
    public homePhone: string;
    @column("Extension", false, true)
    public extension: string;
    @column("Photo", false, true)
    public photo: string;
    @column("Notes", false, true)
    public notes: string;
    @column("ReportsTo", false, true)
    public reportsTo: number;
    @column("PhotoPath", false, true)
    public photoPath: string;

    public getTableName(): string {
        return "Employee";
    }
}
