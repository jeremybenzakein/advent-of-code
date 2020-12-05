const fs = require('fs');


const boardingPassesRaw = fs.readFileSync('inputs/day5.txt', 'utf8')
    .split('\n')
    .filter(line => !! line);


console.log("Advent of Code: DAY 5");
console.log("--------------------");
console.log(`Part 1: ${solution1(boardingPassesRaw)}`);
console.log(`Part 2: ${solution2(boardingPassesRaw)}`);


function solution1(seats) {
    const seatIds = seats.map(line2seatId);
    return Math.max(...seatIds);
}

function solution2(seats) {
    const seatIds = seats.map(line2seatId);
    const highestSeatId = Math.max(...seatIds);

    const freeSeats = [];
    for (let i = 1; i < highestSeatId; i++) {
        if(seatIds.indexOf(i) === -1) freeSeats.push(i);
    }

    return freeSeats.find(seatId => ! (freeSeats.includes(seatId - 1) || freeSeats.includes(seatId + 1)));

}

function line2seatId(line) {
    const binary = line
        .replace(/[FL]/g, "0")
        .replace(/[BR]/g, "1");
    return parseInt(binary, 2)
}

