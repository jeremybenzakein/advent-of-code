const startingNumbers = [19,20,14,0,9,1];

console.log("Advent of Code: DAY 14");
console.log("======================");
console.log(`Part 1: ${solution1(startingNumbers)}`);
console.log(`Part 2: ${solution2(startingNumbers)}`);

function solution1(numbers) {
    const memory = [];
    for (let i = 0; i < 2020; i++) {
        if (i < numbers.length) {
            memory.push(numbers[i]);
        } else {
            const lastSpokenNumber = memory[i - 1];
            const indices = getOccurenceIndices(lastSpokenNumber, memory);
            if (indices.length === 1) {
                memory.push(0);
            } else {
                memory.push(indices[indices.length - 1] - indices[indices.length - 2]);
            }
        }
    }
    return memory[memory.length - 1];
}

function getOccurenceIndices(value, array) {
    return array.reduce((arr, val, index) => {
        if(val === value) {
            arr.push(index)
        }
        return arr;
    }, []);
}



function solution2(numbers) {
    class Memory {
        constructor() {
            this.data = {};
            this.lastSpokenNumber = NaN;
        }

        remember(num, index) {
            if(! this.data[num]) {
                this.data[num] = {
                    index: index,
                    diff: 0
                };
            }
            else {
                this.data[num].diff = index - this.data[num].index
                this.data[num].index = index;
            }
            this.lastSpokenNumber = num;
        }
    }

    const memo = new Memory();

    for (let i = 0; i < 30000000; i++) {

        if(i%100000 === 0) {
            console.log(i);
        }

        if (i < numbers.length) {
            memo.remember(numbers[i], i);
        } else {
            const lsp = memo.lastSpokenNumber;

            if (memo.data[lsp].diff === 0) {
                memo.remember(0, i)
            } else {
                const next = memo.data[lsp].diff;
                memo.remember(next, i)
            }
        }
    }
    return memo.lastSpokenNumber;
}
