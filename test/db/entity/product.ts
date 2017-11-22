import { column, TableEntity } from "../../../src/";

export class Product extends TableEntity {
    @column("Id", true, true)
    public id: number;
    @column("ProductName", false, true)
    public productName: string;
    @column("SupplierId", false, true)
    public supplierId: number;
    @column("CategoryId", false, true)
    public categoryId: number;
    @column("QuantityPerUnit", false, true)
    public quantityPerUnit: string;
    @column("UnitPrice", false, true)
    public unitPrice: number;
    @column("UnitsInStock", false, true)
    public unitsInStock: number;
    @column("UnitsOnOrder", false, true)
    public unitsOnOrder: number;
    @column("ReorderLevel", false, true)
    public reorderLevel: number;
    @column("Discontinued", false, true)
    public discontinued: number;

    public getTableName(): string {
        return "Product";
    }
}
