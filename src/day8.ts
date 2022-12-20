import Day from './day';
import { ArrayUtils, StdinReader } from './helpers';

export default class Day8 implements Day {
    async part1() {
        const reader = new StdinReader();

        let grid = await reader.read2dArray();
        let visibility = ArrayUtils.new2dArray<number>(grid.length, grid[0].length, 0);

        // Rows
        for (let r=0; r < grid.length; r++) {
            let i = { left: 0, right: grid[r].length-1};
            let h = { left: -1, right: -1 };
            while (i.left < grid[r].length && i.right >= 0 && (h.left < 9 || h.right < 9)) {
                if (grid[r][i.left] > h.left) {
                    visibility[r][i.left] = 1;
                    h.left = grid[r][i.left];
                }
                if (grid[r][i.right] > h.right) {
                    visibility[r][i.right] = 1;
                    h.right = grid[r][i.right];
                }
                i.left++;
                i.right--;
            }
        }
        // Cols
        for (let c=0; c < grid[0].length; c++) {
            let i = { top: 0, bottom: grid[0].length-1};
            let h = { top: -1, bottom: -1 };
            while (i.top < grid[0].length && i.bottom >= 0 && (h.top < 9 || h.bottom < 9)) {
                if (grid[i.top][c] > h.top) {
                    visibility[i.top][c] = 1;
                    h.top = grid[i.top][c];
                }
                if (grid[i.bottom][c] > h.bottom) {
                    visibility[i.bottom][c] = 1;
                    h.bottom = grid[i.bottom][c];
                }
                i.top++;
                i.bottom--;
            }
        }

        const visible = ArrayUtils.sum(visibility.map(r => r.filter(v => v > 0).length));
        console.log(visible);
    }

    async part2() {
        const reader = new StdinReader();

        let grid = await reader.read2dArray();

        const treeScore = (grid: number[][], row: number, col: number): number => {
            let scores = [];
            let h = grid[row][col];

            // Up
            let r = row-1;
            for (; r > 0 && grid[r][col] < h; r--) {
            }
            scores.push(row - r);

            // Down
            r = row+1;
            for (; r < grid.length - 1 && grid[r][col] < h; r++) {
            }
            scores.push(r - row);

            // Left
            let c = col-1;
            for (; c > 0 && grid[row][c] < h; c--) {
            }
            scores.push(col - c);

            // Right
            c = col+1;
            for (; c < grid[row].length - 1 && grid[row][c] < h; c++) {
            }
            scores.push(c - col);

            // console.log(scores);
            return scores.reduce((prev, curr) => prev * curr, 1);
        };

        let maxScore = 0;
        for (let r=1; r < grid.length - 1; r++) {
            for (let c=1; c < grid[r].length - 1; c++) {
                maxScore = Math.max(maxScore, treeScore(grid, r, c));
            }
        }

        console.log(maxScore);
    }
};
