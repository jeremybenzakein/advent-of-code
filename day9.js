const fs = require('fs');
const numbers = fs.readFileSync('inputs/day9.txt', 'utf8')
    .split("\n")
    .filter(line => !! line)
    .map(strInt => parseInt(strInt));


console.log("Advent of Code: DAY 9");
console.log("--------------------");
console.log(`Part 1: ${solution1(numbers)}`);
console.log(`Part 2: ${solution2(numbers)}`);


function solution1(numbers) {
    let number;
    for (let index = 25; index < numbers.length; index++) {
        number = numbers[index];
        const previous25Numbers = numbers.slice(index - 25, index);

        if(! checkValidity(number, previous25Numbers)) {
            console.log({index})
            return number;
        }
    }

    function checkValidity(n, valArray) {
        const pairs = makePairs(valArray);
        const sums = pairs.map(pair => pair[0] + pair[1]);
        return sums.includes(n);

        function makePairs(arr) {
            var res = [],
                l = arr.length;
            for(var i=0; i<l; ++i)
                for(var j=i+1; j<l; ++j)
                    res.push([arr[i], arr[j]]);
            return res;
        }
    }

}

function solution2(numbers) {
    const invalidNumber = solution1(numbers);

    const encriptionWeakness = subArrayThatSumsTo(numbers, invalidNumber);

    return Math.min(...encriptionWeakness) +  Math.max(...encriptionWeakness);

    function subArrayThatSumsTo(arr, targetValue) {
        let startingIndex = 0;
        let found = false;
        while(!found) {
            let subArrayLength = 1;
            while(subArrayLength < arr.length - startingIndex) {
                const subArray = arr.slice(startingIndex, startingIndex + subArrayLength);
                const sum = subArray.reduce((a, b) => a + b, 0);

                if (sum < targetValue) {
                    subArrayLength ++;
                } else if (sum === targetValue) {
                    return subArray;
                } else {
                    break;
                }
            }
            startingIndex ++;
        }



    }
}
