import { promises as fs } from "fs";
import Utils from "./utils";

export interface TypographyOptions {
    selector: string;
    styles: Record<string, string>;
}

export interface GlyphOptions {
    prefix: string;
    removeSpaceAfterPrefix: boolean;
    typography: Record<string, Partial<TypographyOptions>>;
    outFile: string;
    includeOnly?: string[];
    exclude?: string[];
}

export const TemplatesGenerator = (options: Partial<TypographyOptions>) => {
    if (!Utils.isObject(options))
        throw new Error(Utils.expected("options", "object", typeof options));

    if (!Utils.isObject(options.styles))
        throw new Error(
            Utils.expected("options.styles", "object", typeof options.styles)
        );

    return `${options.selector} {\n${Utils.MapStyles(
        options.styles,
        Utils.tabSpace
    )}\n}`;
};

export const DefaultTemplates = {
    h1: {
        fontSize: "2em",
        fontWeight: "bold",
    },
    h2: {
        fontSize: "1.5em",
        fontWeight: "bold",
    },
    h3: {
        fontSize: "1.3em",
        fontWeight: "bold",
    },
    h4: {
        fontSize: "1em",
        fontWeight: "bold",
    },
    h5: {
        fontSize: "0.8em",
        fontWeight: "bold",
    },
    h6: {
        fontSize: "0.7em",
        fontWeight: "bold",
    },
    p: {
        fontSize: "1rem",
    },
    code: {},
};

export const Glyph = async (options: Partial<GlyphOptions> = {}) => {
    if (!Utils.isObject(options))
        throw new Error(Utils.expected("options", "object", typeof options));

    if (options.prefix && !Utils.isString(options.prefix))
        throw new Error(
            Utils.expected("options.prefix", "string", typeof options.prefix)
        );

    if (
        "removeSpaceAfterPrefix" in options &&
        !Utils.isBoolean(options.removeSpaceAfterPrefix)
    )
        throw new Error(
            Utils.expected(
                "options.removeSpaceAfterPrefix",
                "boolean",
                typeof options.removeSpaceAfterPrefix
            )
        );

    if (options.outFile && !Utils.isString(options.outFile))
        throw new Error(
            Utils.expected("options.outFile", "string", typeof options.outFile)
        );

    const css: string[] = [];

    let typographies = Object.entries(DefaultTemplates);

    if (options.includeOnly) {
        if (!Utils.isArray(options.includeOnly))
            throw new Error(
                Utils.expected(
                    "options.includeOnly",
                    "array",
                    typeof options.includeOnly
                )
            );

        typographies = typographies.filter(([key]) =>
            options.includeOnly?.includes(key)
        );
    }

    if (options.exclude) {
        if (!Utils.isArray(options.exclude))
            throw new Error(
                Utils.expected(
                    "options.exclude",
                    "array",
                    typeof options.exclude
                )
            );

        typographies = typographies.filter(
            ([key]) => !options.exclude?.includes(key)
        );
    }

    if (options.typography && !Utils.isObject(options.typography))
        throw new Error(
            Utils.expected(
                "options.typography",
                "object",
                typeof options.typography
            )
        );

    typographies.forEach(([key, val]) => {
        const opts = options.typography?.[key] || {};
        if (!Utils.isObject(opts))
            throw new Error(
                Utils.expected(
                    `options.typography.${key}`,
                    "object",
                    typeof opts
                )
            );

        if (!opts.selector) opts.selector = key;
        if (!Utils.isString(opts.selector))
            throw new Error(
                Utils.expected(
                    `options.typography.${key}.selector`,
                    "string",
                    typeof opts.selector
                )
            );

        if (options.prefix)
            opts.selector =
                options.prefix +
                (options.removeSpaceAfterPrefix ? "" : " ") +
                opts.selector;

        opts.styles = Object.assign(val, opts.styles);

        const out = TemplatesGenerator(opts);
        css.push(out);
    });

    const full = css.join("\n");

    if (options.outFile) await fs.writeFile(options.outFile, full);

    return full;
};

export default Glyph;
