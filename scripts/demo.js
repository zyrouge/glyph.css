const path = require("path");
const fs = require("fs").promises;
const glyph = require("../dist/generate").default;

const demoIndexPath = path.join(__dirname, "..", "demo", "index");
const templatePath = demoIndexPath + ".template";
const HtmlPath = demoIndexPath + ".html";

const start = async () => {
    const template = (await fs.readFile(templatePath)).toString();

    const style = await glyph({
        prefix: ".demo",
    });

    const out = template.replace(/\/\* {{ style }} \*\//, style);

    await fs.writeFile(HtmlPath, out);
};

start();
