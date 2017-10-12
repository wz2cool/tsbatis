export function column(name: string, table: string) {
    return (target, propertyKey: string) => {
        console.log("f(): called");
    };
}
