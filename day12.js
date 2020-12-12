const fs = require('fs');
const navigationInstruction = fs.readFileSync('inputs/day12.txt', 'utf8')
    .split("\n")
    .filter(line => !! line);

class Waypoint {
    constructor() {
        this.relativePosition = {x: 10, y: -1}
    }

    move(vector) {
        this.relativePosition.x += vector.x;
        this.relativePosition.y += vector.y;
    }

    rotate(angle) {
        let a, b;
        if (angle === 90 || angle === -270) {
            a = - this.relativePosition.y;
            b = this.relativePosition.x;
        } else if (angle === 180 || angle === -180) {
            a = - this.relativePosition.x;
            b = - this.relativePosition.y;
        } else if (angle === 270 || angle === -90) {
            a = this.relativePosition.y;
            b = - this.relativePosition.x
        } else {
            a = this.relativePosition.x;
            b = this.relativePosition.y;
        }

        this.relativePosition = {x: a, y: b};
    }
}
class Ship {
    constructor() {
        this.position = {x: 0, y: 0};
        this.facingDirection = "E";
        this.waypoint = new Waypoint();
    }

    get dist() {
        return this.calcManhattanDistance();
    }

    logInfos(withWaypoint) {
        const posStr = `${JSON.stringify(this.position)}`
        console.log(`position: ${posStr}`);
        if (withWaypoint) {
            console.log(`waypoint: ${JSON.stringify(this.waypoint.relativePosition)}`)
        } else {
            console.log(`facingDirection: ${this.facingDirection}`);
        }
    }

    executeInstruction1(instruction, DEBUG) {
        if (DEBUG) {
            console.log(`instruction: ${instruction}`);
        }
        const action = instruction.replace(/\d/g, "");
        const param = parseInt(instruction.replace(action, ""));
        switch (action) {
            case ("N"):
                this.move({ x: 0, y: -param });
                break;
            case ("S"):
                this.move({ x: 0, y: param });
                break;
            case ("E"):
                this.move({ x: param, y: 0 });
                break;
            case ("W"):
                this.move({ x: -param, y: 0 });
                break;
            case("L"):
                this.turn(-param);
                break;
            case("R"):
                this.turn(param);
                break;
            case("F"):
                if(this.facingDirection === "N") {
                    this.move({x: 0, y: -param})
                }
                if(this.facingDirection === "S") {
                    this.move({x: 0, y: param})
                }
                if(this.facingDirection === "W") {
                    this.move({x: -param, y: 0})
                }
                if(this.facingDirection === "E") {
                    this.move({x: param, y: 0})
                }
                break;
            default:
                break;
        }
        if(DEBUG) {
            this.logInfos();
        }
    }

    executeInstruction2(instruction, DEBUG) {
        if(DEBUG) {
            console.log(`instruction: ${instruction}`);
        }
        const action = instruction.replace(/\d/g, "");
        const param = parseInt(instruction.replace(action, ""));
        switch (action) {
            case ("N"):
                this.waypoint.move({ x: 0, y: -param });
                break;
            case ("S"):
                this.waypoint.move({ x: 0, y: param });
                break;
            case ("E"):
                this.waypoint.move({ x: param, y: 0 });
                break;
            case ("W"):
                this.waypoint.move({ x: -param, y: 0 });
                break;
            case("F"):
                for (let i = 0; i <param; i++) {
                    this.move(this.waypoint.relativePosition)
                }
                break;
            case("L"):
                this.waypoint.rotate(-param);
                break;
            case("R"):
                this.waypoint.rotate(param);
                break;
            default:
                break;
        }
        if(DEBUG) {
            this.logInfos(true);
        }
    }

    move(vector) {
        this.position.x += vector.x;
        this.position.y += vector.y;
    }

    turn(angle) {

        if(Math.abs(angle) > 360) {
            throw new Error(`angle ${angle}`);
        }
        const directions = ["N", "E", "S", "W"];
        const currentDirectionIndex = directions.indexOf(this.facingDirection);

        this.facingDirection = directions[( 4 + currentDirectionIndex + (angle / 90)) % 4];
    }

    calcManhattanDistance() {
        return Math.abs(this.position.x) + Math.abs(this.position.y);
    }
}

console.log("Advent of Code: DAY 12");
console.log("======================");
console.log(`Part 1: ${solution1(navigationInstruction, false)}`);
console.log(`Part 2: ${solution2(navigationInstruction, true)}`);


function solution1(instructions, DEBUG) {
    const ship = new Ship();
    if(DEBUG) {
        ship.logInfos();
    }
    instructions.forEach(instruction => {
        ship.executeInstruction1(instruction, DEBUG)
    });

    return ship.dist;
}

function solution2(instructions, DEBUG) {
    const ship = new Ship();
    if(DEBUG) {
        ship.logInfos(true);
    }
    instructions.forEach(instruction => {
        ship.executeInstruction2(instruction, DEBUG)
    });

    return ship.dist;
}


