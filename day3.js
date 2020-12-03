const fs = require('fs');


const treeMap = fs.readFileSync('inputs/day3.txt', 'utf8')
    .split('\n')
    .filter(line => !! line);

console.log("Advent of Code: DAY 3");
console.log("--------------------");
console.log(`Part 1: ${solution1(treeMap)}`); // 159
console.log(`Part 2: ${solution2(treeMap)}`);


function solution1(map) {
    const slope = { x: 3, y: 1 };
    return countEncounteredTrees(map, slope);
}

function solution2(map) {
    const slopes = [
        {x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 }
    ];

    let result = 1;
    slopes.forEach(slope => {
        result *= countEncounteredTrees(map, slope);
    })

    return result;
}

function countEncounteredTrees(map, slope) {
    const position = { x: 0, y: 0 },
    mapWidth = map[0].length;

    let treesEncountered = 0;
    while (position.y < map.length) {
        if (isTree(map[position.y][position.x])) {
            treesEncountered ++;
        }

        position.x = (position.x + slope.x) % mapWidth;
        position.y += slope.y;
    }

    return treesEncountered;

    function isTree(char) {
        return char === "#";
    }
}
