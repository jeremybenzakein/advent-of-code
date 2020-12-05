const fs = require('fs');


const passportsRaw = fs.readFileSync('inputs/day4.txt', 'utf8')
    .split('\n\n');

const passports = passportsRaw.map(rawData => {
    const passport = {};
    const fieldsArray = rawData.split(/[\n ]/);

    fieldsArray.forEach(field => {
        [fieldName, fieldValue] = field.split(":");

        passport[fieldName] = fieldValue;
    });

    return passport;
});


console.log("Advent of Code: DAY 4");
console.log("--------------------");
console.log(`Part 1: ${solution1(passports)}`);
console.log(`Part 2: ${solution2(passports)}`);


function solution1(passportsToValidate) {

    return passportsToValidate.filter(hasRequiredFields).length ;
}

function solution2(passportsToValidate) {
    return passportsToValidate.filter(fieldsAreValid).length ;
}


function hasRequiredFields(passport) {
    const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    return requiredFields.every(field => Object.keys(passport).includes(field))
}

function fieldsAreValid(passport) {
    const validationRegexes = {
        byr: /^((19[2-9][0-9])|(200[0-2]))$/,
        iyr: /^20((1[0-9])|20)$/,
        eyr: /^20((2[0-9])|30)$/,
        hgt: /^(1(([5-8][0-9])|(9[0-3]))cm)|(((59)|(6[0-9])|(7[0-6]))in)$/,
        hcl: /^#([0-9a-f]{6})$/,
        ecl: /^(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)$/,
        pid: /^[0-9]{9}$/
    };

    return Object.keys(validationRegexes)
        .every(field => validationRegexes[field].test(passport[field]));
}

