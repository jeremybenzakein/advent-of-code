const fs = require('fs');
const inputTxt = fs.readFileSync('inputs/day1.txt', 'utf8');

const numbers = inputTxt.split('\n').filter(line => !! line).map(strInt => parseInt(strInt));

console.log("Advent of Code: DAY 1");
console.log("--------------------");
console.log(`Part 1: ${solution1(numbers)}`);
console.log(`Part 2: ${solution2(numbers)}`);

function solution1() {
    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if(sum(numbers[i], numbers[j]) === 2020) {
                return product(numbers[i], numbers[j]);
            }
        }
    }
}

function solution2() {
    for (let i = 0; i < numbers.length - 2; i++) {
        for (let j = i + 1; j < numbers.length - 1; j++) {
            for (let k = j + 1; k < numbers.length; k++) {
                if (sum(numbers[i], numbers[j], numbers[k]) === 2020) {
                    return product(numbers[i], numbers[j], numbers[k]);
                }
            }
        }
    }
}


function sum(...args) {
    return args.reduce((a, b) => a + b, 0);
}

function product(...args) {
    return args.reduce((a, b) => a * b, 1);
}
