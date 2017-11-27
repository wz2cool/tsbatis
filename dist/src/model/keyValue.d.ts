export declare class KeyValue<TKey, TValue> {
    private readonly key;
    private readonly value;
    constructor(key: TKey, value: TValue);
    getKey(): TKey;
    getValue(): TValue;
}
