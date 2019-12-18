import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';
import inputTape from './inputTape';

function runScript() {
    const dataOriginal = fs
        .readFileSync(path.join(__dirname, '../../src/day17/data.txt'), 'utf8')
        .split(',')
        .map(x => parseInt(x, 10));
    for (let i = 0; i < 1000; i += 1) {
        dataOriginal.push(0);
    }
    let data = Array.from(dataOriginal);

    const coords = [];
    for (let i = 0; i < 45; i += 1) {
        const line = [];
        for (let j = 0; j < 49; j += 1) {
            line.push(0);
        }
        coords.push(line);
    }

    let x = 0;
    let y = 0;

    function setCoord(character) {
        const sign = String.fromCharCode(character);
        if (sign !== '\n') {
            coords[y][x] = String.fromCharCode(character);
            x += 1;
        } else {
            x = 0;
            y += 1;
        }
    }

    function compute(inputValue) {
        let i = 0;
        let relativeBase = 0;
        let readCounter = 0;
        let outputValue = 0;
        while (1) {
            let numAsString = data[i].toString();
            if (numAsString.length < 5) {
                for (let j = numAsString.length; j < 5; j += 1) {
                    numAsString = `0${numAsString}`;
                }
            }
            const operation = parseInt(
                numAsString.slice(numAsString.length - 2),
                10,
            );
            const firstParamMode = parseInt(numAsString[2], 10);
            const secondParamMode = parseInt(numAsString[1], 10);
            const thirdParamMode = parseInt(numAsString[0], 10);
            switch (operation) {
                case 99:
                    return outputValue;
                case 1:
                    data[
                        thirdParamMode === 2
                            ? data[i + 3] + relativeBase
                            : data[i + 3]
                    ] =
                        data[
                            firstParamMode === 1
                                ? i + 1
                                : firstParamMode === 2
                                ? data[i + 1] + relativeBase
                                : data[i + 1]
                        ] +
                        data[
                            secondParamMode === 1
                                ? i + 2
                                : secondParamMode === 2
                                ? data[i + 2] + relativeBase
                                : data[i + 2]
                        ];
                    i += 4;
                    break;
                case 2:
                    data[
                        thirdParamMode === 2
                            ? data[i + 3] + relativeBase
                            : data[i + 3]
                    ] =
                        data[
                            firstParamMode === 1
                                ? i + 1
                                : firstParamMode === 2
                                ? data[i + 1] + relativeBase
                                : data[i + 1]
                        ] *
                        data[
                            secondParamMode === 1
                                ? i + 2
                                : secondParamMode === 2
                                ? data[i + 2] + relativeBase
                                : data[i + 2]
                        ];
                    i += 4;
                    break;
                case 3:
                    data[
                        firstParamMode === 2
                            ? data[i + 1] + relativeBase
                            : data[i + 1]
                    ] = inputTape[readCounter].charCodeAt();
                    readCounter += 1;
                    i += 2;
                    break;
                case 4:
                    outputValue =
                        data[
                            firstParamMode === 1
                                ? i + 1
                                : firstParamMode === 2
                                ? data[i + 1] + relativeBase
                                : data[i + 1]
                        ];
                    if (!inputValue) {
                        setCoord(outputValue);
                    }
                    i += 2;
                    break;
                case 5:
                    i =
                        data[
                            firstParamMode === 1
                                ? i + 1
                                : firstParamMode === 2
                                ? data[i + 1] + relativeBase
                                : data[i + 1]
                        ] !== 0
                            ? data[
                                  secondParamMode === 1
                                      ? i + 2
                                      : secondParamMode === 2
                                      ? data[i + 2] + relativeBase
                                      : data[i + 2]
                              ]
                            : i + 3;
                    break;
                case 6:
                    i =
                        data[
                            firstParamMode === 1
                                ? i + 1
                                : firstParamMode === 2
                                ? data[i + 1] + relativeBase
                                : data[i + 1]
                        ] === 0
                            ? data[
                                  secondParamMode === 1
                                      ? i + 2
                                      : secondParamMode === 2
                                      ? data[i + 2] + relativeBase
                                      : data[i + 2]
                              ]
                            : i + 3;
                    break;
                case 7:
                    data[
                        thirdParamMode === 2
                            ? data[i + 3] + relativeBase
                            : data[i + 3]
                    ] =
                        data[
                            firstParamMode === 1
                                ? i + 1
                                : firstParamMode === 2
                                ? data[i + 1] + relativeBase
                                : data[i + 1]
                        ] <
                        data[
                            secondParamMode === 1
                                ? i + 2
                                : secondParamMode === 2
                                ? data[i + 2] + relativeBase
                                : data[i + 2]
                        ]
                            ? 1
                            : 0;
                    i += 4;
                    break;
                case 8:
                    data[
                        thirdParamMode === 2
                            ? data[i + 3] + relativeBase
                            : data[i + 3]
                    ] =
                        data[
                            firstParamMode === 1
                                ? i + 1
                                : firstParamMode === 2
                                ? data[i + 1] + relativeBase
                                : data[i + 1]
                        ] ===
                        data[
                            secondParamMode === 1
                                ? i + 2
                                : secondParamMode === 2
                                ? data[i + 2] + relativeBase
                                : data[i + 2]
                        ]
                            ? 1
                            : 0;
                    i += 4;
                    break;
                case 9:
                    relativeBase +=
                        data[
                            firstParamMode === 1
                                ? i + 1
                                : firstParamMode === 2
                                ? data[i + 1] + relativeBase
                                : data[i + 1]
                        ];
                    i += 2;
                    break;
                default:
                    break;
            }
        }
    }

    function isIntersection(xx, yy) {
        if (coords[yy][xx] === '#') {
            if (xx < 1 || xx > 47 || yy < 1 || yy > 43) {
                return false;
            }
            if (
                coords[yy - 1][xx] === '#' &&
                coords[yy + 1][xx] === '#' &&
                coords[yy][xx - 1] === '#' &&
                coords[yy][xx + 1] === '#'
            ) {
                return true;
            }
        }
        return false;
    }

    let t0 = performance.now();
    compute(0);
    const t1 = performance.now() - t0;

    let resultPart1 = 0;

    for (let i = 0; i < 45; i += 1) {
        for (let j = 0; j < 49; j += 1) {
            const intersection = isIntersection(j, i);
            if (intersection) {
                resultPart1 += i * j;
            }
        }
    }

    data = Array.from(dataOriginal);
    data[0] = 2;
    t0 = performance.now();
    const resultPart2 = compute(1);
    const t2 = performance.now() - t0;

    console.log('=====================================');
    console.log('==');
    console.log('==  Day 17');
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
