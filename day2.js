const fs = require('fs');

const passwordsToValidate = fs.readFileSync('inputs/day2.txt', 'utf8')
    .split('\n')
    .filter(line => !! line)
    .map(parseLine);

console.log("Advent of Code: DAY 2");
console.log("--------------------");
console.log(`Part 1: ${solution1(passwordsToValidate)}`);
console.log(`Part 2: ${solution2(passwordsToValidate)}`);

function parseLine(line) {
    const [policy, pw] = line.split(":");
    const [abStr, char] = policy.split(" ");
    const [a, b] = abStr.split("-").map(Number);;

    return {
        policy: {
            a,
            b,
            char
        },
        pw
    }
}

function solution1(passwords) {
    return passwords.filter(isValid).length;

    function isValid(input) {
        const charCount = countChar(input.policy.char, input.pw);
        return charCount >= input.policy.a && charCount <= input.policy.b;

        function countChar(char, str) {
            let result = 0;

            for (let i = 0; i < str.length; i++) {
                if (str.charAt(i) === char) result++;
            }

            return result;
        }
    }
}

function solution2(passwords) {
    return passwords.filter(isValid).length;

    function isValid(password) {
        return password.pw.charAt(password.policy.a) === password.policy.char && password.pw.charAt(password.policy.b) !== password.policy.char
            || password.pw.charAt(password.policy.a) !== password.policy.char && password.pw.charAt(password.policy.b) === password.policy.char;
    }
}



