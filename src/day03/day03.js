import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

function runScript() {
    const dataOriginal = fs
        .readFileSync(path.join(__dirname, '../../src/day03/data.txt'), 'utf8')
        .split('\n');

    const wire1 = dataOriginal[0]
        .split(',')
        .map(x => [x.slice(0, 1), parseInt(x.slice(1), 10)]);
    const wire2 = dataOriginal[1]
        .split(',')
        .map(x => [x.slice(0, 1), parseInt(x.slice(1), 10)]);

    let coords = {};
    coords = {};
    const allIntersections = [];
    let step = 0;

    function generateCoordsTab(x, y, wireId) {
        if (!coords[`${x}`]) coords[`${x}`] = {};

        if (!coords[`${x}`][`${y}`]) {
            if (wireId === 3) {
                coords[`${x}`][`${y}`] = [wireId, 0, step];
            } else {
                coords[`${x}`][`${y}`] = [wireId, step, 0];
            }
        } else {
            coords[`${x}`][`${y}`][0] += wireId;
            if (wireId === 3) {
                coords[`${x}`][`${y}`][2] = step;
            } else coords[`${x}`][`${y}`][1] = step;
            if (coords[`${x}`][`${y}`][0] === 4) {
                allIntersections.push({
                    xCoord: x,
                    yCoord: y,
                    xStep: coords[`${x}`][`${y}`][1],
                    yStep: coords[`${x}`][`${y}`][2],
                });
            }
        }
        step += 1;
    }

    function createPath(wire, wireId) {
        let currentX = 0;
        let currentY = 0;
        generateCoordsTab(currentX, currentY, 1);
        wire.map((x) => {
            const len = x[1];
            switch (x[0]) {
                case 'U':
                    for (let i = 0; i < len; i += 1) {
                        currentY += 1;
                        generateCoordsTab(currentX, currentY, wireId);
                    }
                    break;
                case 'R':
                    for (let i = 0; i < len; i += 1) {
                        currentX += 1;
                        generateCoordsTab(currentX, currentY, wireId);
                    }
                    break;
                case 'D':
                    for (let i = 0; i < len; i += 1) {
                        currentY -= 1;
                        generateCoordsTab(currentX, currentY, wireId);
                    }
                    break;
                case 'L':
                    for (let i = 0; i < len; i += 1) {
                        currentX -= 1;
                        generateCoordsTab(currentX, currentY, wireId);
                    }
                    break;
                default:
                    break;
            }
            return 0;
        });
    }

    let t0 = performance.now();
    createPath(wire1, 1);
    step = 0;
    createPath(wire2, 3);

    let closestIntersection =
        Math.abs(allIntersections[0].xCoord) +
        Math.abs(allIntersections[0].yCoord);
        allIntersections.map((intersection) => {
            const manhattanDistance =
            Math.abs(intersection.xCoord) + Math.abs(intersection.yCoord);
            console.log(manhattanDistance);
        if (manhattanDistance < closestIntersection) {
            closestIntersection = manhattanDistance;
        }
        return 0;
    });
    let t1 = performance.now() - t0;

    console.log('===========================');
    console.log('==');
    console.log('==  Day 3');
    console.log('==');
    console.log('==  Part 1:');
    console.log(`==  ${closestIntersection}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('==  Part 2:');

    t0 = performance.now();
    let minSteps = allIntersections[0].xStep + allIntersections[0].yStep;
    allIntersections.map((intersection) => {
        const stepCounter = intersection.xStep + intersection.yStep;
        if (stepCounter < minSteps) minSteps = stepCounter;
        return 0;
    });
    t1 = performance.now() - t0;

    console.log(`==  ${minSteps}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('===========================\n');
}

export default { runScript };
