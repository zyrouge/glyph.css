const path = require("path");
const fs = require("fs").promises;
const glyph = require("../dist/generate").default;
const { homepage } = require("../package.json");

const DocsPath = path.resolve(__dirname, "..", "docs");
const CnamePath = path.join(DocsPath, "CNAMEE");
const CssPath = path.join(DocsPath, "glyph.css");

const start = async () => {
    const styles = await glyph({
        prefix: ".demo",
    });

    await fs.writeFile(CssPath, styles);
    console.log(`Created: ${CssPath}`);

    await fs.writeFile(CnamePath, homepage);
    console.log(`Created: ${CnamePath}`);
};

start();
