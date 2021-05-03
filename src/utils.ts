export default {
    MapStyles(styles: Record<string, string>, space: string = "") {
        return Object.entries(styles)
            .map(([key, val]) => `${space}${this.toHyphenCase(key)}: ${val};`)
            .join("\n");
    },
    isObject: (x: any): x is object => typeof x === "object",
    isString: (x: any): x is string => typeof x === "string",
    isBoolean: (x: any): x is boolean => typeof x === "boolean",
    isArray: Array.isArray,
    expected: (key: string, exprected: string, received: string) =>
        `Expected type of '${key}' to be '${exprected}' but received '${received}'`,
    tabSpace: "    ",
    toHyphenCase: (text: string) =>
        text.replace(/([A-Z])/g, (str) => `-${str.toLowerCase()}`),
};
