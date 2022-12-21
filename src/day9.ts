import Day from './day';
import { ArrayUtils, StdinReader } from './helpers';

type Direction = 'U' | 'D' | 'L' | 'R';
type Pos = {
    row: number,
    col: number,
};

const printGrid = (grid: number[][], head: Pos, tails: Pos[]) => {
    for (let r=0; r < grid.length; r++) {
        const row = grid[r].map((c, i) => {
            if (r === head.row && i === head.col) {
                return 'H';
            } else {
                for(let t=0; t <= tails.length; t++) {
                    if (t === tails.length) {
                        return (c > 0 ? '#' : '.');
                    } else {
                        if (r === tails[t].row && i === tails[t].col) {
                            return `${t}`;
                        }
                    }
                    tails.filter(t => t.row === r && t.col === i)
                }
                return '?';
            }
        }).join('');
        console.log(row);
    }
    console.log();
}

const moveTail = (head: Pos, tail: Pos): Pos => {
    if (Math.abs(head.row - tail.row) > 1) {
        tail.row += (head.row - tail.row) / Math.abs(head.row - tail.row);
        if (Math.abs(head.col - tail.col) > 0) {
            tail.col += (head.col - tail.col) / Math.abs(head.col - tail.col);
        }
    } else if (Math.abs(head.col - tail.col) > 1) {
        tail.col += (head.col - tail.col) / Math.abs(head.col - tail.col);
        if (Math.abs(head.row - tail.row) > 0) {
            tail.row += (head.row - tail.row) / Math.abs(head.row - tail.row);
        }
    }
    return tail;
}

export default class Day9 implements Day {
    async run(tailCount: number) {
        const reader = new StdinReader();

        const grid: number[][] = [[0]];
        let head: Pos = {row: 0, col: 0};
        let tails: Pos[] = [];
        for (let t=0; t < tailCount; t++) {
            tails.push({row: 0, col: 0});
        }

        // printGrid(grid, head, tail);

        let line: string;
        while (line = await reader.read()) {
            const [dir, dist] = line.split(' ');
            let distance = parseInt(dist);

            // console.log(line);

            while (distance > 0) {
                switch (dir) {
                    case 'U':
                        if (head.row === 0) {
                            grid.unshift(new Array(grid[0].length).fill(0));
                            head.row++;
                            tails.forEach(t => t.row++);
                        }
                        head.row--;
                        break;
                    case 'D':
                        if (head.row === grid.length - 1) {
                            grid.push(new Array(grid[0].length).fill(0));
                        }
                        head.row++;
                        break;
                    case 'L':
                        if (head.col === 0) {
                            for (const r in grid) {
                                grid[r].unshift(0);
                            }
                            head.col++;
                            tails.forEach(t => t.col++);
                        }
                        head.col--;
                        break;
                    case 'R':
                        if (head.col === grid[0].length - 1) {
                            for (const r in grid) {
                                grid[r].push(0);
                            }
                        }
                        head.col++;
                        break;
                }
                moveTail(head, tails[0]);
                for (let t=1; t < tails.length; t++) {
                    moveTail(tails[t-1], tails[t]);
                }
                grid[tails[tails.length-1].row][tails[tails.length-1].col] = 1;
                // console.log(`H: ${head}, T: ${tail}`);
                distance--;

            }
            // printGrid(grid, head, tails);
        }

        const visited = ArrayUtils.sum(grid.map(r => r.filter(c => c > 0).length));
        console.log(visited);
    }

    async part1() {
        this.run(1);
    }

    async part2() {
        this.run(9);
    }
};
