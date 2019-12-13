import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

function runScript() {
    const dataOriginal = fs
        .readFileSync(
            path.join(__dirname, '../../src/day11/Input11.txt'),
            'utf8',
        )
        .split(',')
        .map(x => parseInt(x, 10));
    // console.log(dataOriginal.length);

    for (let i = 0; i < 5000; i += 1) {
        dataOriginal.push(0);
    }
    // console.log(dataOriginal.toString());
    const data = Array.from(dataOriginal);
    const coords = {};
    let xCoord = 0;
    let yCoord = 0;
    let robotDirection = 0;
    const robotPositions = [[0, 0]];

    function getColor() {
        const color =
            (coords[`${xCoord}`] && coords[`${xCoord}`][`${yCoord}`]) || 0;
        console.log(`GET COLOR: ${color}`);
        return color;
    }

    function setCoord(color) {
        if (!coords[`${xCoord}`]) {
            console.log(`${xCoord} not found in coords array`);
            coords[`${xCoord}`] = {};
        }
        console.log(`SET COLOR TO ${color} AT POSITION ${xCoord}, ${yCoord}`);
        coords[`${xCoord}`][`${yCoord}`] = color;
        console.log(coords);
    }

    function setPosition(direction) {
        console.log(`SET DIRECTION ${direction} FROM ${xCoord}, ${yCoord}`);
        // if (direction) {
        //     console.log('TURN RIGHT');
        //     robotDirection = (robotDirection + 1) % 4;
        // } else {
        //     console.log('TURN LEFT');
        //     robotDirection = robotDirection - 1 >= 0 ? robotDirection - 1 : 3;
        // }

        robotDirection = (robotDirection + direction * 2 - 1 + 4) % 4;

        switch (robotDirection) {
            case 0:
                yCoord += 1;
                break;
            case 2:
                yCoord -= 1;
                break;
            case 1:
                xCoord += 1;
                break;
            case 3:
                xCoord -= 1;
                break;
            default:
                break;
        }
        robotPositions.push(`(${xCoord}, ${yCoord})`);
        console.log(`SET POSITION TO ${xCoord}, ${yCoord}`);
    }

    function compute() {
        let i = 0;
        let relativeBase = 0;
        let inputValue = 0;
        let evenOutput = 0;
        const output = [0, 0];
        let ii = 0;
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
                    console.log('OPCODE #99');
                    return 0;
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
                    console.log('===============================');
                    console.log(`iter: ${ii}`);
                    inputValue = getColor();
                    console.log(`INPUT VAL: ${inputValue}`);
                    data[
                        thirdParamMode === 2
                            ? data[i + 3] + relativeBase
                            : data[i + 3]
                    ] = inputValue;
                    i += 2;
                    ii += 1;
                    if (ii > 23) return 0;
                    break;
                case 4:
                    if (evenOutput) {
                        output[1] =
                            data[
                                firstParamMode === 1
                                    ? i + 1
                                    : firstParamMode === 2
                                    ? data[i + 1] + relativeBase
                                    : data[i + 1]
                            ];
                        console.log(`COLLECT NEXT DIRECTION: ${output[1]}`);
                        setCoord(output[0]);
                        setPosition(output[1]);
                        evenOutput = !evenOutput;
                    } else {
                        output[0] =
                            data[
                                firstParamMode === 1
                                    ? i + 1
                                    : firstParamMode === 2
                                    ? data[i + 1] + relativeBase
                                    : data[i + 1]
                            ];
                        console.log(`COLLECT NEXT COLOR: ${output[0]}`);

                        evenOutput = !evenOutput;
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

    const t0 = performance.now();
    compute();
    // console.log(`==  ${res}`);

    // console.log('COORDS:');
    // console.log(coords);
    console.log(robotPositions.toString());

    const t1 = performance.now() - t0;

    let result = 0;

    for (const key in coords) {
        if (!coords.hasOwnProperty(key)) continue;
        result += Object.keys(coords[key]).length;
    }

    console.log(`RESULT: ${result}`);
    // t0 = performance.now();

    // t1 = performance.now() - t0;
    console.log('===========================');
    console.log('==');
    console.log('==  Day 10');
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
