import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

function runScript() {
    const dataOriginal = fs
        .readFileSync(path.join(__dirname, '../../src/day02/data.txt'), 'utf8')
        .split(',')
        .map(x => parseInt(x, 10));

    let data = Array.from(dataOriginal);

    data[1] = 12;
    data[2] = 2;

    console.log('===========================');
    console.log('==');
    console.log('==  Day 2');
    console.log('==');
    console.log('==  Part 1:');

    function compute() {
        for (let pointer = 0; pointer < data.length; pointer += 4) {
            if (data[pointer] === 99) break;
            else if (data[pointer] === 1) {
                data[data[pointer + 3]] =
                    data[data[pointer + 1]] + data[data[pointer + 2]];
            } else if (data[pointer] === 2) {
                data[data[pointer + 3]] =
                    data[data[pointer + 1]] * data[data[pointer + 2]];
            }
        }
    }

    let t0 = performance.now();
    compute();
    let t1 = performance.now() - t0;

    console.log(`==  ${data[0]}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('==  Part 2:');

    function findCorrectPair() {
        for (let noun = 0; noun < 100; noun += 1) {
            for (let verb = 0; verb < 100; verb += 1) {
                data = Array.from(dataOriginal);
                data[1] = noun;
                data[2] = verb;
                compute();
                if (data[0] === 19690720) {
                    return (100 * noun) + verb;
                }
            }
        }
        return 0;
    }

    t0 = performance.now();
    console.log(`==  ${findCorrectPair()}`);
    t1 = performance.now() - t0;
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('===========================\n');
}

export default { runScript };
