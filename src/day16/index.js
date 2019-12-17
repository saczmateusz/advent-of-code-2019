import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

function runScript() {
    const dataOriginal = fs
        .readFileSync(path.join(__dirname, '../../src/day16/data.txt'), 'utf8')
        .split('')
        .map(num => parseInt(num, 10));

    const makeRepeated = (arr, repeats) =>
        [].concat(...Array.from({ length: repeats }, () => arr));

    let data = JSON.parse(JSON.stringify(dataOriginal));
    const pattern = [0, 1, 0, -1];

    let t0 = performance.now();
    let i = 0;
    while (i < 100) {
        for (let index = 0; index < data.length; index += 1) {
            let nextValue = 0;
            for (let counter = index; counter < data.length; counter += 1) {
                nextValue +=
                    data[counter] *
                    pattern[Math.floor(((counter + 1) / (index + 1)) % 4)];
            }
            nextValue = nextValue.toString();
            data[index] = parseInt(nextValue.slice(nextValue.length - 1), 10);
        }
        i += 1;
    }
    const resultPart1 = data.slice(0, 8).join('');
    const t1 = performance.now() - t0;

    data = makeRepeated(dataOriginal, 10000);

    t0 = performance.now();
    const offset = parseInt(data.slice(0, 7).join(''), 10);
    i = 0;
    while (i < 100) {
        for (let index = data.length - 2; index >= offset; index -= 1) {
            const nextValue = (data[index] + data[index + 1]).toString();
            data[index] = parseInt(nextValue.slice(nextValue.length - 1), 10);
        }
        i += 1;
    }
    const t2 = performance.now() - t0;

    const resultPart2 = data.slice(offset, offset + 8).join('');
    console.log('=====================================');
    console.log('==');
    console.log('==  Day 16');
    console.log('==');
    console.log('==  Part 1:');
    console.log(`==  ${resultPart1}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('==  Part 2:');
    console.log(`==  ${resultPart2}`);
    console.log('==');
    console.log(`==  Execution time: ${t2.toFixed(3)} ms`);
    console.log('==');
    console.log('=====================================\n');
}

export default { runScript };
