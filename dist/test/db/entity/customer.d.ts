import { TableEntity } from "../../../src/";
export declare class Customer extends TableEntity {
    id: string;
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
    getTableName(): string;
}
