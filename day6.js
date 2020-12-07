const fs = require('fs');


const answeresByGroup = fs.readFileSync('inputs/day6.txt', 'utf8')
    .split('\n\n')
    .map(groupAnsweres => groupAnsweres.split("\n").filter(line => !! line));


console.log("Advent of Code: DAY 6");
console.log("--------------------");
console.log(`Part 1: ${solution1(answeresByGroup)}`);
console.log(`Part 2: ${solution2(answeresByGroup)}`);


function solution1(groupAnsweres) {
    return groupAnsweres.map(countYes).reduce(sum, 0);

    function countYes(personalAnsweres) {
        return new Set(personalAnsweres
            .map(answers => answers.split(""))
            .flat()).size;
    }

    function sum(a, b) {
        return a + b;
    }
}

function solution2(groupAnsweres) {
    return groupAnsweres.map(countCommonYes).reduce(sum, 0);

    function sum(a, b) {
        return a + b;
    }
}

function countCommonYes(personalAnsweres) {
    let commonYesCount = 0;
    const firstPersonAnswers = personalAnsweres[0]

    firstPersonAnswers.split("").forEach(letter => {
        if (personalAnsweres.every(ans => ans.includes(letter))) {
            commonYesCount++;
        }
    })

    return commonYesCount;
}
