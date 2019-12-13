import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

function runScript() {
    const dataOriginal = fs
        .readFileSync(path.join(__dirname, '../../src/day12/data.txt'), 'utf8')
        .split('\n')
        .map(moon => moon.split(',').map(coord => parseInt(coord, 10)))
        .map((moon) => {
            if (moon.length === 3) moon = [...moon, 0, 0, 0];
            return moon;
        });

    let data = JSON.parse(JSON.stringify(dataOriginal));

    function calculateGravityImpact() {
        for (let i = 0; i < data.length; i += 1) {
            for (let j = 0; j < data.length; j += 1) {
                if (i < j) {
                    for (let k = 0; k < 3; k += 1) {
                        data[i][k + 3] =
                            data[i][k] < data[j][k]
                                ? data[i][k + 3] + 1
                                : data[i][k] !== data[j][k]
                                ? data[i][k + 3] - 1
                                : data[i][k + 3];
                        data[j][k + 3] =
                            data[i][k] < data[j][k]
                                ? data[j][k + 3] - 1
                                : data[i][k] !== data[j][k]
                                ? data[j][k + 3] + 1
                                : data[j][k + 3];
                    }
                    continue;
                }
            }
        }
    }

    function applyVelocity() {
        for (let i = 0; i < data.length; i += 1) {
            for (let k = 0; k < 3; k += 1) {
                data[i][k] += data[i][k + 3];
            }
        }
    }

    function totalEnergy() {
        let totEnergy = 0;
        for (let i = 0; i < data.length; i += 1) {
            let potEnergy = 0;
            let kinEnergy = 0;
            for (let k = 0; k < 3; k += 1) {
                potEnergy += Math.abs(data[i][k]);
                kinEnergy += Math.abs(data[i][k + 3]);
            }
            totEnergy += potEnergy * kinEnergy;
        }
        return totEnergy;
    }

    function simulateIterations(count) {
        for (let i = 0; i < count; i += 1) {
            calculateGravityImpact();
            applyVelocity();
        }
        return totalEnergy();
    }

    function findRepeat() {
        const terms = [0, 0, 0];
        for (let k = 0; k < 3; k += 1) {
            data = JSON.parse(JSON.stringify(dataOriginal));
            let iteration = 2;
            while (1) {
                calculateGravityImpact();
                applyVelocity();
                if (
                    data[0][k] === dataOriginal[0][k] &&
                    data[1][k] === dataOriginal[1][k] &&
                    data[2][k] === dataOriginal[2][k] &&
                    data[3][k] === dataOriginal[3][k]
                ) {
                    if (terms[k] === 0) {
                        terms[k] = iteration;
                    }
                }
                if (terms[k] !== 0) break;
                iteration += 1;
            }
        }
        return terms;
    }

    function gcd(a, b) {
        let t = 0;
        if (a < b) {
            t = b;
            b = a;
            a = t;
        }
        t = a % b;
        return t ? gcd(b, t) : b;
    }

    function lcm(a, b) {
        return (a / gcd(a, b)) * b;
    }

    let t0 = performance.now();
    const result1 = simulateIterations(1000);
    const t1 = performance.now() - t0;

    t0 = performance.now();
    const terms = findRepeat();
    const temp = lcm(terms[0], terms[1]);
    const result2 = lcm(temp, terms[2]);
    const t2 = performance.now() - t0;
    console.log('===========================');
    console.log('==');
    console.log('==  Day 12');
    console.log('==');
    console.log('==  Part 1:');
    console.log(`==  ${result1}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('==  Part 2:\n');
    console.log(`==  ${result2}`);
    console.log('==');
    console.log(`==  Execution time: ${t2.toFixed(3)} ms`);
    console.log('==');
    console.log('===========================\n');
}

export default { runScript };
