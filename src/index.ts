console.clear();
console.log('MAP Testing Solver');
console.log(`Made by Luis Quezada - https://quezada.nl`);
console.log(``);

async function main() {
    console.log(`[BOOT] Starting system & loading modules...`);
    console.log(`---------------------------------`);
    console.log(`[INFO] Starting Express Server...`);
    await require('./app');
}

main();