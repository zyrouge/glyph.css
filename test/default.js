const path = require("path");
const glyph = require("../dist/generate").default;

const start = async () => {
    await glyph({
        prefix: ".prose",
        outFile: path.join(__dirname, "styles.css"),
    });
};

start();
