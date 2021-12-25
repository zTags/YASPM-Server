import { writeFileSync } from "fs";

const __dirname = process.cwd();

function gracefulShutdown(accs: any) {
    info("Cleaning up...");
    writeFileSync(__dirname + "/yaspm/accounts.json", JSON.stringify(accs));
    info("shutting down.");
    process.exit(0);
}

async function error(message: string) {
    process.stdout.clearLine(0, () => {
        process.stdout.cursorTo(0);
        process.stderr.write(`\u001b[31m[YASPM]\u001b[0m ${message}\n`);
        process.stdout.write("YASPM>");
    });
}

async function info(message: string) {
    process.stdout.clearLine(0, () => {
        process.stdout.cursorTo(0);
        process.stdout.write(`\u001b[34m[YASPM]\u001b[0m ${message}\nYASPM> `);
    });
}

export {
    error,
    info,
    gracefulShutdown
};