import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

function runScript() {
    const data = fs
        .readFileSync(path.join(__dirname, '../../src/day01/data.txt'), 'utf8')
        .split('\n')
        .map(x => parseInt(x, 10));
    console.log('===========================');
    console.log('==');
    console.log('==  Day 1');
    console.log('==');
    console.log('==  Part 1:');
    let t0 = performance.now();
    let result = data.reduce((sum, x) => sum + (Math.floor(x / 3) - 2), 0);
    let t1 = performance.now() - t0;
    console.log(`==  ${result}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');

    console.log('==  Part 2:');
    t0 = performance.now();
    function requiredFuel(number) {
        const fuel = Math.floor(number / 3) - 2;
        if (fuel <= 0) return 0;
        return fuel + requiredFuel(fuel);
    }
    result = data.reduce((sum, x) => sum + requiredFuel(x), 0);
    t1 = performance.now() - t0;
    console.log(`==  ${result}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('===========================\n');
}

export default { runScript };
