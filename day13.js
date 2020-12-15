const fs = require('fs');

const data = fs.readFileSync('inputs/day13.txt', 'utf8').split('\n');
const earliestDeparture = parseInt(data[0]);
const busses = data[1].split(",");

console.log("Advent of Code: DAY 11");
console.log("======================");
console.log(`Part 1: ${solution1(earliestDeparture, busses)}`);
console.log(`Part 2: ${solution2(busses)}`);

function solution1(earliestDeparture, busses) {

    const bs = busses.filter(bus => bus !== "x").map(n => parseInt(n));
    const waitingTimes = bs.map(bus => calcWaitingTime(earliestDeparture, bus));

    const bestBusIndex = waitingTimes.indexOf(Math.min(...waitingTimes))

    return bs[bestBusIndex]*waitingTimes[bestBusIndex];
}

function calcWaitingTime(time, busNbr) {
    return  busNbr - time%busNbr;
}

function solution2(busses) {
    const constraints = [];

    busses.forEach((busId, index) => {
        if(busId === "x") {
            return;
        }

        const frequency = parseInt(busId);
        const offset = frequency - index % frequency;
        constraints.push({ frequency, offset });
    });

    const product = constraints.reduce((acc, constraint) => acc * constraint.frequency, 1);

    let result = 0n;
    constraints.forEach((constraint) => {
        const [, v] = getBezoutCoeffs(constraint.frequency, product / constraint.frequency);
        result += BigInt(constraint.offset) * BigInt(v * (product / constraint.frequency));
    });
    return parseInt((result % BigInt(product)).toString());
}

function getBezoutCoeffs(a, b) {
    let [r1, u1, v1, r2, u2, v2] = [a, 1, 0, b, 0, 1];
    let q = 0;
    while (r2 !== 0) {
        q = Math.floor(r1 / r2);
        [r1, u1, v1, r2, u2, v2] = [r2, u2, v2, r1 - q * r2, u1 - q * u2, v1 - q * v2];
    }
    const alpha = Math.ceil(-v1 / a);
    return [u1 - alpha * b, v1 + alpha * a];
}
