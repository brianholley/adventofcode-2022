import Day from './day';
import { StdinReader } from './helpers';

type Stack = string[];
type Move = {
    count: number,
    source: number,
    dest: number,
};

const readStacks = async (reader: StdinReader) => {
    let stacks: Stack[] = [];

    let line: string;
    while (line = await reader.read()) {

        // Last row is row indices
        if (line.indexOf('[') < 0) {
            const stackIndices = line.split(' ');
            const stackCount = parseInt(stackIndices[stackIndices.length-1]);
            for (let i=0; i < stackCount; i++) {
                if (!stacks[i]) {
                    stacks[i] = [];
                }
            }
            break;
        }

        // Each row is of the form "    [M] [P]"
        for (let i=0; i < line.length; i += 4) {
            const stackIndex = Math.floor(i / 4);
            const val = line.substring(i, i+4).substring(1, 2);
            if (val !== ' ') {
                if (!stacks[stackIndex]) {
                    stacks[stackIndex] = [];
                }
                stacks[stackIndex].unshift(val);
            }
        }
    }
    return stacks;
}

const move = (stacks: Stack[], move: Move) => {
    for (let i=0; i < move.count; i++) {
        const v = stacks[move.source].pop();
        stacks[move.dest].push(v);
    }
};

const moveRetainOrder = (stacks: Stack[], move: Move) => {
    const crates = [];
    for (let i=0; i < move.count; i++) {
        crates.unshift(stacks[move.source].pop());
    }
    for (const c of crates) {
        stacks[move.dest].push(c);
    }
};

export default class Day5 implements Day {
    async run(moveFunc: (stacks: Stack[], move: Move) => void) {
        const reader = new StdinReader();

        const stacks = await readStacks(reader);

        // console.log(JSON.stringify(stacks));

        await reader.read(); // Blank line

        let line: string;
        while (line = await reader.read()) {
            // console.log(line);
            const parts = line.split(' ');
            
            moveFunc(stacks, {
                count: parseInt(parts[1]),
                source: parseInt(parts[3]) - 1,
                dest: parseInt(parts[5]) - 1,
            });
            // console.log(JSON.stringify(stacks));
        }

        const tops = stacks.reduce((prev, curr) => {
            return prev + curr[curr.length-1];
        }, '');
        console.log(tops);
    }

    async part1() {
        this.run(move);
    }

    async part2() {
        this.run(moveRetainOrder);
    }
};
