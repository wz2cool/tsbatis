import { column, TableEntity } from "../../../src/";

export class Employee extends TableEntity {
  @column({ columnName: "Id", isPK: true, autoIncrease: true })
  public id: number;
  @column({ columnName: "LastName" })
  public lastName: string;
  @column({ columnName: "FirstName" })
  public firstName: string;
  @column({ columnName: "Title" })
  public title: string;
  @column({ columnName: "TitleOfCourtesy" })
  public titleOfCourtesy: string;
  @column({ columnName: "BirthDate" })
  public birthDate: string;
  @column({ columnName: "HireDate" })
  public hireDate: string;
  @column({ columnName: "Address" })
  public address: string;
  @column({ columnName: "City" })
  public city: string;
  @column({ columnName: "Region" })
  public region: string;
  @column({ columnName: "PostalCode" })
  public postalCode: string;
  @column({ columnName: "Country" })
  public country: string;
  @column({ columnName: "HomePhone" })
  public homePhone: string;
  @column({ columnName: "Extension" })
  public extension: string;
  @column({ columnName: "Photo" })
  public photo: string;
  @column({ columnName: "Notes" })
  public notes: string;
  @column({ columnName: "ReportsTo" })
  public reportsTo: number;
  @column({ columnName: "PhotoPath" })
  public photoPath: string;

  public getTableName(): string {
    return "Employee";
  }
}
