import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

function runScript() {
    const dataOriginal = fs
        .readFileSync(path.join(__dirname, '../../src/day05/data.txt'), 'utf8')
        .split(',')
        .map(x => parseInt(x, 10));

    let data = Array.from(dataOriginal);

    function compute(inputValue) {
        let i = 0;
        let result = 0;
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
            switch (operation) {
                case 99:
                    return result;
                case 1:
                    data[data[i + 3]] =
                        data[
                            data[i + 1] * !firstParamMode +
                                (i + 1) * firstParamMode
                        ] +
                        data[
                            data[i + 2] * !secondParamMode +
                                (i + 2) * secondParamMode
                        ];
                    i += 4;
                    break;
                case 2:
                    data[data[i + 3]] =
                        data[
                            data[i + 1] * !firstParamMode +
                                (i + 1) * firstParamMode
                        ] *
                        data[
                            data[i + 2] * !secondParamMode +
                                (i + 2) * secondParamMode
                        ];
                    i += 4;
                    break;
                case 3:
                    data[data[i + 1]] = inputValue;
                    i += 2;
                    break;
                case 4:
                    result =
                        data[
                            data[i + 1] * !firstParamMode +
                                (i + 1) * firstParamMode
                        ];
                    i += 2;
                    break;
                case 5:
                    i =
                        data[
                            data[i + 1] * !firstParamMode +
                                (i + 1) * firstParamMode
                        ] !== 0
                            ? data[
                                  data[i + 2] * !secondParamMode +
                                      (i + 2) * secondParamMode
                              ]
                            : i + 3;
                    break;
                case 6:
                    i =
                        data[
                            data[i + 1] * !firstParamMode +
                                (i + 1) * firstParamMode
                        ] === 0
                            ? data[
                                  data[i + 2] * !secondParamMode +
                                      (i + 2) * secondParamMode
                              ]
                            : i + 3;
                    break;
                case 7:
                    data[data[i + 3]] =
                        data[
                            data[i + 1] * !firstParamMode +
                                (i + 1) * firstParamMode
                        ] <
                        data[
                            data[i + 2] * !secondParamMode +
                                (i + 2) * secondParamMode
                        ]
                            ? 1
                            : 0;
                    i += 4;
                    break;
                case 8:
                    data[data[i + 3]] =
                        data[
                            data[i + 1] * !firstParamMode +
                                (i + 1) * firstParamMode
                        ] ===
                        data[
                            data[i + 2] * !secondParamMode +
                                (i + 2) * secondParamMode
                        ]
                            ? 1
                            : 0;
                    i += 4;
                    break;
                default:
                    break;
            }
        }
    }

    let t0 = performance.now();
    const resultPart1 = compute(1);
    const t1 = performance.now() - t0;

    data = Array.from(dataOriginal);
    t0 = performance.now();
    const resultPart2 = compute(5);
    const t2 = performance.now() - t0;

    console.log('==============================');
    console.log('==');
    console.log('==  Day 5');
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
    console.log('==============================\n');
}

export default { runScript };
