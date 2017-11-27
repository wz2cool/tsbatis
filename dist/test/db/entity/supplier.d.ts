import { TableEntity } from "../../../src/";
export declare class Supplier extends TableEntity {
    id: number;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    fax: string;
    homePage: string;
    getTableName(): string;
}
