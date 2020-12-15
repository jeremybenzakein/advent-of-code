const fs = require('fs');

const programLines = fs.readFileSync('inputs/day14.txt', 'utf8').split('\n');


class Memory {
    constructor() {
        this.data = {};
        this.mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    }

    executeV1(line) {
        const [instruction, parameter] = line.split(" = ");

        if (instruction === "mask") {
            this.setMask(parameter);
        }

        if(instruction.startsWith("mem[")) {
            const address = instruction.replace(/[me\[\]]/g, "");
            this.setValue(address, this.maskValue(parseInt(parameter)));
        }
    }

    executeV2(line) {
        const [instruction, parameter] = line.split(" = ");

        if (instruction === "mask") {
            this.setMask(parameter);
        }

        if(instruction.startsWith("mem[")) {
            const baseAddress = int2bin(parseInt(instruction.replace(/[me\[\]]/g, ""))).padStart(36, "0");

            const maskedAdress = this.maskAddress(baseAddress);
            const correspondingMemoryAddresses = findAllAddressesThatFit(maskedAdress);

            correspondingMemoryAddresses.forEach(address => {
                this.setValue(address, parseInt(parameter));
            })
        }

        function findAllAddressesThatFit(maskedAdress) {
            const addresses = [];
            const numberOfX = (maskedAdress.match(/X/g) || []).length;
            const variantNbr = 2**numberOfX;

            for (let i = 0; i < variantNbr; i++) {
                const fillers = int2bin(i).padStart(numberOfX, "0");
                let newAddress= "", fillerIndex = 0;
                for (const char of maskedAdress) {
                    if (char === "X") {
                        newAddress += fillers[fillerIndex];
                        fillerIndex ++;
                    } else {
                        newAddress += char;
                    }
                }
                addresses.push(newAddress);
            }

            return addresses.map(address => parseInt(address, 2));
        }
    }

    setMask(mask) {
        this.mask = mask;
    }

    setValue(address, value) {
        this.data[address] = value;
    }

    maskValue(int) {
        const bin = int2bin(int)
            .padStart(36, "0");

        const maskedBin = bin
            .split("")
            .map((bit, index) => {
                return applyMask(bit, index, this.mask)
            })
            .join("");
        return parseInt(maskedBin, 2);

        function applyMask(bit, index, mask) {
            return mask[index] === "X" ? bit : mask[index];
        }
    }

    maskAddress(address) {
        return address
            .split("")
            .map((bit, index) => {
                return applyMask(bit, index, this.mask)
            })
            .join("");

        function applyMask(bit, index, mask) {
            if (mask[index] === "0") return bit;
            return mask[index];
        }
    }

    get sum() {
        let result = 0;

        for (const key of Object.keys(this.data)) {
            result += this.data[key];
        }
        return result;
    }
}

console.log("Advent of Code: DAY 14");
console.log("======================");
console.log(`Part 1: ${solution1(programLines)}`);
console.log(`Part 2: ${solution2(programLines)}`);

function solution1(program) {
    const memory = new Memory();

    for (const line of program) {
        memory.executeV1(line)
    }

    return memory.sum;
}

function solution2(program) {
    const memory = new Memory();

    for (const line of program) {
        memory.executeV2(line)
    }

    return memory.sum;
}

function int2bin(int) {
    return (int >>> 0).toString(2);
}

function bin2int(bin) {
    return parseInt(bin, 2);
}
