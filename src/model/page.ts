import { Entity } from "./entity";

export class Page<T extends Entity> {
    private _pageNum: number;
    private _pageSize: number;
    private _total: number;
    private _pages: number;
    private _entities: T[];

    constructor(pageNum: number, pageSize: number, total: number, entities: T[]) {
        this._pageNum = pageNum;
        this._pageSize = pageSize;
        this._total = total;
        this._entities = entities;
        // calculate pages
    }

    public get pageNum() {
        return this._pageNum;
    }

    public get pageSize() {
        return this._pageSize;
    }

    public get total() {
        return this._total;
    }

    public get pages() {
        return this._pages;
    }

    public get entities() {
        return this._entities;
    }
}
