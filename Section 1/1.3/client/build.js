var fsExtra = require("fs-extra");
var cp = require("child_process");

console.log("\x1b[35m***BUILD***\x1b[0m");

console.log("Cleaning...");
fsExtra.emptyDirSync("dist");

console.log("Building...");
try {
    cp.execSync("node node_modules/typescript/bin/tsc", {
        stdio: "inherit"
    });
    console.log("\x1b[35m***BUILD COMPLETE***\x1b[0m");
} catch (ex) {
    console.log(ex.stdout);
    console.log("\x1b[35m***BUILD FAILED***\x1b[0m");
    return;
}

console.log("\x1b[35m***Copying www...***\x1b[0m")
fsExtra.copy("./www", "./dist", function (err) {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log("\x1b[35mDone.\x1b[0m");
    }
});