const start = async () => {
    try {
        const demo = await fetch("./glyph.css").then(res => res.text());
        document.getElementById("demo-output").innerText = demo;
    } catch (err) {}
}

start();