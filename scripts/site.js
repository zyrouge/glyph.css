const path = require("path");
const fs = require("fs").promises;
const { URL } = require("url");
const util = require("util");
const ncpCb = require("ncp");
const glyph = require("../dist/generate").default;
const { homepage } = require("../package.json");

const DocsPath = path.resolve(__dirname, "..", "docs");
const CnamePath = path.join(DocsPath, "CNAME");
const CssPath = path.join(DocsPath, "glyph.css");
const SitePath = path.resolve(__dirname, "site");

const ncp = util.promisify(ncpCb);

const start = async () => {
    await fs.rm(DocsPath, {
        recursive: true,
        force: true
    });
    console.log(`Removed: ${DocsPath}`);

    await fs.mkdir(DocsPath, {
        recursive: true
    });
    console.log(`Created: ${DocsPath}`);

    await ncp(SitePath, DocsPath);
    console.log(`Copied: ${SitePath} -> ${DocsPath}`);

    const styles = await glyph({
        prefix: ".demo",
    });

    await fs.writeFile(CssPath, styles);
    console.log(`Created: ${CssPath}`);

    const { host } = new URL(homepage);
    await fs.writeFile(CnamePath, host);
    console.log(`Created: ${CnamePath}`);
};

start();
