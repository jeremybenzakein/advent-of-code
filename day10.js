const fs = require('fs');
const joltages = fs.readFileSync('inputs/day10.txt', 'utf8')
    .split("\n")
    .filter(line => !! line)
    .map(strInt => parseInt(strInt))
    .sort((a, b) => a - b);


console.log("Advent of Code: DAY 10");
console.log("--------------------");
console.log(`Part 1: ${solution1(joltages)}`);
console.log(`Part 2: ${solution2(joltages)}`);


function solution1(adapterJoltages) {
    adapterJoltages.unshift(0);
    adapterJoltages.push(adapterJoltages[adapterJoltages.length - 1] + 3);
    const differencesCounts = {}
    for (let i = 0; i < adapterJoltages.length - 1; i++) {
        const diff = adapterJoltages[i+1] - adapterJoltages[i];
        if (!differencesCounts.hasOwnProperty(diff)) {
            differencesCounts[diff] = 1;
        } else {
            differencesCounts[diff] += 1;
        }
    }
    return differencesCounts[1] * differencesCounts[3];
}



function solution2(adapterJoltages) {
    const memo = {}
    return countArrangements(adapterJoltages, 0);

    function countArrangements(remainingNumbers, start) {
        const key = JSON.stringify([...remainingNumbers, start]);
        if (key in memo) {
            return memo[key];
        }

        const nbArrangements = computeNbArrangements();
        memo[key] = nbArrangements;
        return nbArrangements;

        function computeNbArrangements() {
            if (remainingNumbers.length === 0) {
                return start === adapterJoltages[adapterJoltages.length - 1] ? 1 : 0;
            }

            let res = 0;
            for (let offset = 1; offset <= 3; offset++) {
                if (remainingNumbers.includes(start + offset)) {
                    res += countArrangements(
                        remainingNumbers.filter(n => n > start + offset),
                        start + offset);
                }
            }
            return res;
        }
    }
}
