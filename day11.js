const fs = require('fs');
const map = fs.readFileSync('inputs/day11.txt', 'utf8')
    .split("\n")
    .filter(line => !! line)
    .map(line => line.split(""));

console.log("Advent of Code: DAY 11");
console.log("======================");
console.log(`Part 1: ${solution1(map)}`);
console.log(`Part 2: ${solution2(map)}`);


function solution1(emptySeatsMap) {
    let currentMap = [];
    let nextMap = emptySeatsMap;
    // printMap(nextMap);
    while (! areEqual(currentMap, nextMap)) {
        currentMap = JSON.parse(JSON.stringify(nextMap));
        nextMap = computeNextMap(currentMap);
    }

    return countOccupiedSeats(nextMap);

    function computeNextMap(previousMap) {
        const mapToBuild = []
        for (let r = 0; r < previousMap.length; r++) {
            const rowToBuild = [];
            for (let c = 0; c < previousMap.length; c++) {
                if (isFloor(r, c, previousMap)) {
                    rowToBuild.push(cell("floor"))
                } else if (isFree(r, c, previousMap) && countOccupiedNeighbours(r,c, previousMap) === 0) {
                    rowToBuild.push(cell("occupiedSeat"))
                } else if (isOccupied(r, c, previousMap) && countOccupiedNeighbours(r,c, previousMap) >= 4) {
                    rowToBuild.push(cell("freeSeat"))
                } else {
                    rowToBuild.push(previousMap[r][c]);
                }
            }
            mapToBuild.push(rowToBuild);
        }
        // printMap(mapToBuild);
        return mapToBuild;

        function countOccupiedNeighbours(r, c, seatsMap) {
            let count = 0;
            for (let rOffset = -1; rOffset <= 1; rOffset++) {
                for (let cOffset = -1; cOffset <= 1; cOffset++) {
                    if(isInside(r+rOffset, c + cOffset, seatsMap)) {
                        if(!(rOffset === 0 && cOffset === 0) && isOccupied(r+rOffset, c + cOffset, seatsMap)) {
                            count++;
                        }
                    }
                }
            }
            return count;
        }
    }
}

function solution2(emptySeatsMap) {
    let currentMap = [];
    let nextMap = emptySeatsMap;
    // printMap(nextMap);
    while (! areEqual(currentMap, nextMap)) {
        currentMap = JSON.parse(JSON.stringify(nextMap));
        nextMap = computeNextMap(currentMap);
    }

    return countOccupiedSeats(nextMap);

    function computeNextMap(previousMap) {
        const mapToBuild = []
        for (let r = 0; r < previousMap.length; r++) {
            const rowToBuild = [];
            for (let c = 0; c < previousMap.length; c++) {
                if (isFloor(r, c, previousMap)) {
                    rowToBuild.push(cell("floor"))
                } else if (isFree(r, c, previousMap) && countOccupiedVisibleSeats(r,c, previousMap) === 0) {
                    rowToBuild.push(cell("occupiedSeat"))
                } else if (isOccupied(r, c, previousMap) && countOccupiedVisibleSeats(r,c, previousMap) >= 5) {
                    rowToBuild.push(cell("freeSeat"))
                } else {
                    rowToBuild.push(previousMap[r][c]);
                }
            }
            mapToBuild.push(rowToBuild);
        }
        // printMap(mapToBuild);
        return mapToBuild;


        function countOccupiedVisibleSeats(r, c, seatsMap) {
            let count = 0;
            //top
            let rOffset = 1;
            let cOffset = 0;
            while(true) {
                if (! isInside(r - rOffset, c + cOffset, seatsMap)) {
                    break;
                } else if (isFloor(r - rOffset, c + cOffset, seatsMap)) {
                    rOffset++;
                } else if (isOccupied(r - rOffset, c + cOffset, seatsMap)) {
                    count++;
                    break;
                } else {
                    break;
                }
            }
            //topRight
            rOffset = 1;
            cOffset = 1;
            while(true) {
                if (! isInside(r - rOffset, c + cOffset, seatsMap)) {
                    break;
                } else if (isFloor(r - rOffset, c + cOffset, seatsMap)) {
                    rOffset++;
                    cOffset++;
                } else if (isOccupied(r - rOffset, c + cOffset, seatsMap)) {
                    count++;
                    break;
                } else {
                    break;
                }
            }
            //right
            rOffset = 0;
            cOffset = 1;
            while(true) {
                if (! isInside(r + rOffset, c + cOffset, seatsMap)) {
                    break;
                } else if (isFloor(r + rOffset, c + cOffset, seatsMap)) {
                    cOffset++;
                } else if (isOccupied(r + rOffset, c + cOffset, seatsMap)) {
                    count++;
                    break;
                } else {
                    break;
                }
            }
            //bottomRight
            rOffset = 1;
            cOffset = 1;
            while(true) {
                if (! isInside(r + rOffset, c + cOffset, seatsMap)) {
                    break;
                } else if (isFloor(r + rOffset, c + cOffset, seatsMap)) {
                    rOffset++;
                    cOffset++;
                } else if (isOccupied(r + rOffset, c + cOffset, seatsMap)) {
                    count++;
                    break;
                } else {
                    break;
                }
            }
            //bottom
            rOffset = 1;
            cOffset = 0;
            while(true) {
                if (! isInside(r + rOffset, c + cOffset, seatsMap)) {
                    break;
                } else if (isFloor(r + rOffset, c + cOffset, seatsMap)) {
                    rOffset++;
                } else if (isOccupied(r + rOffset, c + cOffset, seatsMap)) {
                    count++;
                    break;
                } else {
                    break;
                }
            }
            //bottomLeft
            rOffset = 1;
            cOffset = 1;
            while(true) {
                if (! isInside(r + rOffset, c - cOffset, seatsMap)) {
                    break;
                } else if (isFloor(r + rOffset, c - cOffset, seatsMap)) {
                    rOffset++;
                    cOffset++;
                } else if (isOccupied(r + rOffset, c - cOffset, seatsMap)) {
                    count++;
                    break;
                } else {
                    break;
                }
            }
            //left
            rOffset = 0;
            cOffset = 1;
            while(true) {
                if (! isInside(r + rOffset, c - cOffset, seatsMap)) {
                    break;
                } else if (isFloor(r + rOffset, c - cOffset, seatsMap)) {
                    cOffset++;
                } else if (isOccupied(r + rOffset, c - cOffset, seatsMap)) {
                    count++;
                    break;
                } else {
                    break;
                }
            }
            //topLeft
            rOffset = 1;
            cOffset = 1;
            while(true) {
                if (! isInside(r - rOffset, c - cOffset, seatsMap)) {
                    break;
                } else if (isFloor(r - rOffset, c - cOffset, seatsMap)) {
                    rOffset++;
                    cOffset++;
                } else if (isOccupied(r - rOffset, c - cOffset, seatsMap)) {
                    count++;
                    break;
                } else {
                    break;
                }
            }

            return count;
        }
    }
}


function isInside(rIndex, cIndex, seatsMap) {
    return rIndex >= 0 && rIndex < seatsMap.length
        && cIndex >= 0 && cIndex < seatsMap[0].length;
}

function areEqual(map1, map2) {
    return JSON.stringify(map1) === JSON.stringify(map2);
}
function countOccupiedSeats(seatsMap) {
    let result = 0;
    for (let r = 0; r < seatsMap.length; r++) {
        for (let c = 0; c < seatsMap.length; c++) {
            if (isOccupied(r, c, seatsMap)) {
                result ++;
            }
        }
    }
    return result;
}


function printMap(mapArray) {
    console.log("----------");
    console.log(mapArray.map(line => line.join("")).join("\n"));
    console.log("----------");
}
function isFloor(r, c, mapArray) {
    return mapArray[r][c] === cell("floor");
}
function isFree(r, c, mapArray) {
    return mapArray[r][c] === cell("freeSeat");
}
function isOccupied(r, c, mapArray) {
    return mapArray[r][c] === cell("occupiedSeat");
}
function cell(type) {
    if(! ["floor", "occupiedSeat", "freeSeat"].includes(type)) {
        throw new Error(`Invalid cell type ${type}`);
    }

    return {
        floor: ".",
        occupiedSeat: "#",
        freeSeat: "L"
    }[type];
}
