const fs = require('fs');


const program = fs.readFileSync('inputs/day8.txt', 'utf8')
    .split('\n')
    .filter(line => !! line)
    .map(line => {
        const [operation, param] = line.split(" ");

        return {
            operation,
            param: parseInt(param)
        }
    });


console.log("Advent of Code: DAY 8");
console.log("--------------------");
console.log(`Part 1: ${solution1(program)}`);
console.log(`Part 2: ${solution2(program)}`);


function solution1(programLines) {
    return exectuteFirstLoop(programLines);

    function exectuteFirstLoop(prog) {
        const executedLines = [];
        let head = 0,
        acc = 0;

        while (! executedLines.includes(head)) {
            executedLines.push(head);
            const {operation, param} = prog[head];

            switch (operation) {
                case "nop":
                    head++;
                    break;
                case "acc":
                    acc += param;
                    head++;
                    break;
                case "jmp":
                    head += param;
                    break;
                default:
                    console.log("wtf ?§")
                    break;
            }
        }

        return acc;
    }
}

function solution2(programLines) {
    let modifiedInstructionIndex = 0,
        modifiableInstructionEncountered = 0;


    let head = 0,
        acc = 0;

    let executedLines = [];
    while (head !== programLines.length) {
        if (executedLines.includes(head)) {
            modifiedInstructionIndex++;
            executedLines = [];
            modifiableInstructionEncountered = 0;
            head = 0;
            acc = 0;
        }

        const {operation, param} = programLines[head];
        executedLines.push(head);

        switch (operation) {
            case "nop":
                if (modifiableInstructionEncountered === modifiedInstructionIndex) {
                    console.log(`modified line ${head}: ${operation}(${param})`)
                    head += param;
                } else {
                    head++;
                }
                modifiableInstructionEncountered++;
                break;
            case "acc":
                acc += param;
                head++;
                break;
            case "jmp":
                if (modifiableInstructionEncountered === modifiedInstructionIndex) {
                    console.log(`modified line ${head}: ${operation}(${param})`)
                    head++;
                } else {
                    head += param;
                }
                modifiableInstructionEncountered++;
                break;
            default:
                console.log("wtf ?§")
                break;
        }

    }

    return acc;
}
