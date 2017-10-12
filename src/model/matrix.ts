export class Matrix<T> {
    private width: number;
    private height: number;
    private rows: T[][];

    constructor(arr: T[][]);
    constructor(width: number, height: number, defaultFill: T);
    constructor(a1, a2?, a3?) {
        //
    }

}
