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
    console.log('==  Day 8');
    console.log('==');
    console.log('==  Part 1:');

    function countPixels() {
        const layers = [];
        let iterator = 0;
        let minimumNumberOfZeros = 150;
        let onesTimesTwos = 0;
        while (iterator < data.length) {
            const layer = [...data.slice(iterator, iterator + 150)];
            layers.push(layer);
            const counter = layer.reduce(
                ([zeros, ones, twos], current) => {
                    switch (current) {
                        case 0:
                            return [zeros + 1, ones, twos];
                        case 1:
                            return [zeros, ones + 1, twos];
                        case 2:
                            return [zeros, ones, twos + 1];
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
        return [layers, onesTimesTwos];
    }

    let t0 = performance.now();
    const result = countPixels();
    let t1 = performance.now() - t0;

    console.log(`==  ${result[1]}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('==  Part 2:\n');

    t0 = performance.now();
    const picture = result[0][result[0].length - 1];
    for (let layer = result[0].length - 2; layer >= 0; layer -= 1) {
        for (let pixel = 0; pixel < result[0][layer].length; pixel += 1) {
            picture[pixel] =
                result[0][layer][pixel] === 2
                    ? picture[pixel]
                    : result[0][layer][pixel];
        }
    }

    function drawPicture() {
        let line = '';
        for (let pixel = 0; pixel < picture.length; pixel += 1) {
            line += (picture[pixel] === 0
                ? '██'
                : picture[pixel] === 1
                ? '░░'
                : ''
            ).toString();
            if ((pixel + 1) % 25 === 0 && pixel > 0) {
                line += '\n';
            }
        }
        console.log(line);
    }

    drawPicture();
    t1 = performance.now() - t0;
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('===========================\n');
}

export default { runScript };
