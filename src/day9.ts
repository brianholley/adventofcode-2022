import Day from './day';
import { ArrayUtils, StdinReader } from './helpers';

type Direction = 'U' | 'D' | 'L' | 'R';
type Pos = [number, number];

const printGrid = (grid: number[][], head: Pos, tail: Pos) => {
    for (let r=0; r < grid.length; r++) {
        const row = grid[r].map((c, i) => {
            if (r === head[0] && i === head[1]) {
                return 'H';
            } else if (r === tail[0] && i === tail[1]) {
                return 'T';
            } else {
                return (c > 0 ? '#' : '.');
            } 
        }).join('');
        console.log(row);
    }
    console.log();
}

const moveTail = (head: Pos, tail: Pos): Pos => {
    if (Math.abs(head[0] - tail[0]) > 1) {
        tail[0] += (head[0] - tail[0]) / Math.abs(head[0] - tail[0]);
        if (Math.abs(head[1] - tail[1]) > 0) {
            tail[1] += (head[1] - tail[1]) / Math.abs(head[1] - tail[1]);
        }
    } else if (Math.abs(head[1] - tail[1]) > 1) {
        tail[1] += (head[1] - tail[1]) / Math.abs(head[1] - tail[1]);
        if (Math.abs(head[0] - tail[0]) > 0) {
            tail[0] += (head[0] - tail[0]) / Math.abs(head[0] - tail[0]);
        }
    }
    return tail;
}

export default class Day9 implements Day {
    async part1() {
        const reader = new StdinReader();

        const grid: number[][] = [[1]];
        let head: Pos = [0, 0];
        let tail: Pos = [0, 0];

        // printGrid(grid, head, tail);

        let line: string;
        while (line = await reader.read()) {
            const [dir, dist] = line.split(' ');
            let distance = parseInt(dist);

            // console.log(line);

            while (distance > 0) {
                switch (dir) {
                    case 'U':
                        if (head[0] === 0) {
                            grid.unshift(new Array(grid[0].length).fill(0));
                            head[0]++;
                            tail[0]++;
                        }
                        head[0]--;
                        break;
                    case 'D':
                        if (head[0] === grid.length - 1) {
                            grid.push(new Array(grid[0].length).fill(0));
                        }
                        head[0]++;
                        break;
                    case 'L':
                        if (head[1] === 0) {
                            for (const r in grid) {
                                grid[r].unshift(0);
                            }
                            head[1]++;
                            tail[1]++;
                        }
                        head[1]--;
                        break;
                    case 'R':
                        if (head[1] === grid[0].length - 1) {
                            for (const r in grid) {
                                grid[r].push(0);
                            }
                        }
                        head[1]++;
                        break;
                }
                moveTail(head, tail);
                grid[tail[0]][tail[1]] = 1;
                // console.log(`H: ${head}, T: ${tail}`);
                distance--;

                // printGrid(grid, head, tail);
            }
        }

        const visited = ArrayUtils.sum(grid.map(r => r.filter(c => c > 0).length));
        console.log(visited);
    }

    async part2() {
        const reader = new StdinReader();

        let line: string;
        while (line = await reader.read()) {
        }
    }
};
