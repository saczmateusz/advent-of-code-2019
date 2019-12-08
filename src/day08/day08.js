import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

function runScript() {
    const dataOriginal = fs
        .readFileSync(path.join(__dirname, '../../src/day08/data.txt'), 'utf8')
        .split('')
        .map(x => parseInt(x, 10));

    const data = Array.from(dataOriginal);

    console.log('===========================');
    console.log('==');
    console.log('==  Day 1');
    console.log('==');
    console.log('==  Part 1:');

    function countPixels() {
        const layers = [];
        let iterator = 0;
        let minimumNumberOfZeros = 150;
        let onesTimesTwos = 0;
        while (iterator < data.length) {
            const layer = [...data.slice(iterator, iterator + 150)];
            console.log(`Layer elements: ${layer}\nLayer len: ${layer.length}`);
            layers.push(layer);
            const counter = layer.reduce(
                ([zeros, ones, twos], current) => {
                    switch (current) {
                        case 0:
                            zeros += 1;
                            return [zeros, ones, twos];
                        case 1:
                            ones += 1;
                            return [zeros, ones, twos];
                        case 2:
                            twos += 1;
                            return [zeros, ones, twos];
                        default:
                            break;
                    }
                    return [zeros, ones, twos];
                },
                [0, 0, 0],
            );
            if (minimumNumberOfZeros > counter[0]) {
                minimumNumberOfZeros = counter[0];
                onesTimesTwos = counter[1] * counter[2];
            }
            iterator += 150;
        }
        return onesTimesTwos;
    }

    const t0 = performance.now();

    const result = countPixels();
    const t1 = performance.now() - t0;

    console.log(`==  ${result}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    // console.log('==  Part 2:');

    // t0 = performance.now();
    // function requiredFuel(number) {
    //     const fuel = Math.floor(number / 3) - 2;
    //     if (fuel <= 0) return 0;
    //     return fuel + requiredFuel(fuel);
    // }
    // result = data.reduce((sum, x) => sum + requiredFuel(x), 0);
    // t1 = performance.now() - t0;

    // console.log(`==  ${result}`);
    // console.log('==');
    // console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    // console.log('==');
    // console.log('===========================\n');
}

export default { runScript };
