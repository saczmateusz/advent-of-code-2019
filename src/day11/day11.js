import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

function runScript() {
    const dataOriginal = fs
        .readFileSync(path.join(__dirname, '../../src/day11/data.txt'), 'utf8')
        .split(',')
        .map(x => parseInt(x, 10));
    // console.log(dataOriginal.length);
    for (let i = 0; i < 34463338; i += 1) {
        dataOriginal.push(0);
    }
    // console.log(dataOriginal.toString());
    const data = Array.from(dataOriginal);
    let coordX = 0;
    let coordY = 0;
    const coords = {};
    let uniqueCounter = 0;
    let robotDirection = 0;

    function getColorFromTab() {
        return (
            coords && coords[`${coordX}`] && coords[`${coordX}`][`${coordY}`]
        );
    }

    function generateCoordsTab(direction, color) {
        if (!coords[`${coordX}`]) coords[`${coordX}`] = {};

        if (!coords[`${coordX}`][`${coordY}`]) {
            coords[`${coordX}`][`${coordY}`] = color;
            uniqueCounter += 1;
        } else {
            coords[`${coordX}`][`${coordY}`] = color;
        }

        switch (robotDirection) {
            case 1:
                coordX += 1;
                break;
            case 3:
                coordX -= 1;
                break;
            case 0:
                coordY += 1;
                break;
            case 2:
                coordY -= 1;
                break;
            default:
                break;
        }

        if (direction) {
            robotDirection = (robotDirection + 1) % 4;
        } else {
            robotDirection = robotDirection - 1 >= 0 ? robotDirection - 1 : 3;
        }
    }

    function compute() {
        let i = 0;
        let jj = 0;
        let relativeBase = 0;
        const result = 0;
        let evenOutput = 0;
        const output = [0, 0];
        let inputValue = 0;
        while (1) {
            jj += 1;
            if (jj % 10000000 === 0) console.log(`instr: ${jj}`);
            let numAsString = data[i].toString();
            // console.log(numAsString);
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
                    return Object.keys(coords).length;
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
                    inputValue = getColorFromTab();
                    data[
                        thirdParamMode === 2
                            ? data[i + 3] + relativeBase
                            : data[i + 3]
                    ] = inputValue;
                    i += 2;
                    break;
                case 4:
                    // console.log(i);
                    if (!evenOutput) {
                        output[0] =
                            data[
                                firstParamMode === 1
                                    ? i + 1
                                    : firstParamMode === 2
                                    ? data[i + 1] + relativeBase
                                    : data[i + 1]
                            ];
                        evenOutput = !evenOutput;
                    } else {
                        output[1] =
                            data[
                                firstParamMode === 1
                                    ? i + 1
                                    : firstParamMode === 2
                                    ? data[i + 1] + relativeBase
                                    : data[i + 1]
                            ];
                        evenOutput = !evenOutput;
                        generateCoordsTab(output[0], output[1]);
                    }
                    console.log('Instruction 4 output values:');
                    console.log(output);
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
                            // data[i + 1] * !firstParamMode +
                            //     (i + 1) * firstParamMode
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

    const t0 = performance.now();
    const res = compute();
    console.log(`==  ${res}`);

    const t1 = performance.now() - t0;

    // t0 = performance.now();

    // t1 = performance.now() - t0;
    console.log('===========================');
    console.log('==');
    console.log('==  Day 9');
    console.log('==');
    console.log('==  Part 1:');
    // console.log(`==  ${data}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('==  Part 2:\n');
    // console.log(`==  ${data}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('===========================\n');
}

export default { runScript };
