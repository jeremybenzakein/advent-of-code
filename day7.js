const fs = require('fs');

const graph1 = {};
const graph2 = {};
const rulesStr = fs.readFileSync('inputs/day7.txt', 'utf8')
    .split('\n')
    .filter(line => !! line)
    .forEach(line => {
        const [definedBagColor, content] = line.split(" bags contain ")

        const allowedContent = content
            .split(", ")
            .map(str => ({
                color: str.replace(/(\d+ )|( bag(s)?(\.)?)/g, ""),
                count: parseInt(str.match(/\d+/g) ? str.match(/\d+/g)[0] : 0)
            }))

        if (allowedContent[0].color === "no other") {
            graph1[definedBagColor] = [];
            graph2[definedBagColor] = [];
        } else {
            graph1[definedBagColor] = allowedContent.map(content => content.color);
            graph2[definedBagColor] = allowedContent;
        }
    });

console.log("Advent of Code: DAY 7");
console.log("--------------------");
console.log(`Part 1: ${solution1(graph1)}`);
console.log(`Part 2: ${solution2(graph2)}`);


function solution1(g) {
    let result = 0;
    for (const color of Object.keys(g)) {
        const colorsInBag = getAllPossibleColorsInBag(g, color);

        if(colorsInBag.includes("shiny gold")) {
            result++;
        } else {
        }
    }
    return result - 1; // -1 as shiny gold bags can't contain shiny gold bags
}

function getAllPossibleColorsInBag(colorGraph, bagColor) {
    const countedColors = [];
    populateCountedColors(bagColor);
    return countedColors;


    function populateCountedColors(currentColor) {
        if (countedColors.includes(currentColor)) {
            return 0;
        }
        else {
            countedColors.push(currentColor);
            const contentColors = colorGraph[currentColor]
            contentColors.forEach(col => populateCountedColors(col))
        }

        return colorGraph[currentColor];
    }
}

function solution2(g) {
    return countBagsIn("shiny gold", g);

    function countBagsIn(bagColor) {

        const bagsInside = g[bagColor];

        return bagsInside.reduce((acc, bag) => acc + bag.count + bag.count * countBagsIn(bag.color), 0);
    }
}



