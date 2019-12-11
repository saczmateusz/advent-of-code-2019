import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

function runScript() {
    const data = fs
        .readFileSync(path.join(__dirname, '../../src/day06/data.txt'), 'utf8')
        .split('\n')
        .map(elem => elem.split(')'))
        .map(elem => ({ A: elem[0], B: elem[1] }));

    const bothObjList = [];

    function recursiveSearch(object) {
        const index = data.findIndex(obj => object === obj.B);
        if (index === -1) {
            return 0;
        }
        return 1 + recursiveSearch(data[index].A);
    }

    function recursiveList(object) {
        const index = data.findIndex(obj => object === obj.B);
        if (index === -1) {
            return null;
        }
        bothObjList.push(data[index].A);
        return recursiveList(data[index].A);
    }

    let t0 = performance.now();

    const resultA = data.reduce((sum, obj) => {
        sum += recursiveSearch(obj.B);
        return sum;
    }, 0);

    const t1 = performance.now() - t0;

    console.log('================================');
    console.log('==');
    console.log('==  Day 6');
    console.log('==');
    console.log('==  Part 1:');
    console.log(`==  ${resultA}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('==  Part 2:');
    console.log('==');

    t0 = performance.now();

    recursiveList('YOU');
    recursiveList('SAN');
    let youList = bothObjList.slice(0, bothObjList.indexOf('COM') + 1);
    let sanList = bothObjList.slice(bothObjList.indexOf('COM') + 1);

    let index = -1;
    for (let i = 0; i < youList.length; i += 1) {
        index = sanList.findIndex(nodeSan => nodeSan === youList[i]);
        if (index !== -1) break;
    }

    youList = youList.slice(0, youList.indexOf(sanList[index]) + 1);
    sanList = sanList.slice(0, index);

    const resultB = youList.length + sanList.length - 1;

    const t2 = performance.now() - t0;

    console.log(`==  ${resultB}`);
    console.log('==');
    console.log(`==  Execution time: ${t2.toFixed(3)} ms`);
    console.log('==');
    console.log('================================');
}

export default { runScript };
