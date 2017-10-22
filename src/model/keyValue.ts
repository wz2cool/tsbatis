export class KeyValue<TKey, TValue> {
    private readonly key: TKey;
    private readonly value: TValue;
    constructor(key: TKey, value: TValue) {
        this.key = key;
        this.value = value;
    }

    public getKey(): TKey {
        return this.key;
    }

    public getValue(): TValue {
        return this.value;
    }
}
