import { performance } from 'perf_hooks';

function runScript() {
    const range = [183564, 657474];
    let resultPart1 = 0;
    let resultPart2 = 0;

    const notDecreasing = (password) => {
        let isCorrectNumber = 1;
        password.reduce((previous, current) => {
            if (previous > current) isCorrectNumber = 0;
            return current;
        }, password[0]);
        return isCorrectNumber;
    };

    const twoAdjacent = (password) => {
        let isPair = 0;
        password.reduce((previous, current) => {
            if (previous === current) isPair = 1;
            return current;
        }, password[0]);
        return isPair;
    };

    const exactlyTwoAdjacent = (password) => {
        const groupedDigits = password.reduce(
            (grouped, current) =>
                Object.assign(grouped, {
                    [current]: [...(grouped[current] || []), current],
                }),
            {},
        );
        const arrayFromObject = Object.entries(groupedDigits);
        return arrayFromObject.some(current => current[1].length === 2);
    };

    const t0 = performance.now();
    for (let i = range[0]; i <= range[1]; i += 1) {
        const password = i
            .toString()
            .split('')
            .map(digit => parseInt(digit, 10));
        if (!notDecreasing(password)) continue;
        resultPart1 += twoAdjacent(password);
        resultPart2 += exactlyTwoAdjacent(password);
    }
    const t1 = performance.now() - t0;

    console.log('================================');
    console.log('==');
    console.log('==  Day 4');
    console.log('==');
    console.log('==  Part 1:');
    console.log(`==  ${resultPart1}`);
    console.log('==');
    console.log('==  Part 2:');
    console.log(`==  ${resultPart2}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('================================\n');
}
export default { runScript };
