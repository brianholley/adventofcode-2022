import Day from './day';
import { StdinReader } from './helpers';

export default class Day4 implements Day {
    async part1() {
        const reader = new StdinReader();

        let overlaps = 0;
        let line: string;
        while (line = await reader.read()) {
            const [first, second] = line.split(',').map(assignment => assignment.split('-').map(n => parseInt(n)));
            if (first[1] - first[0] > second[1] - second[0]) {
                if (first[0] <= second[0] && first[1] >= second[1]) {
                    overlaps++;
                }
            } else {
                if (second[0] <= first[0] && second[1] >= first[1]) {
                    overlaps++;
                }
            }
        }
        console.log(overlaps);
    }

    async part2() {
        const reader = new StdinReader();

        let overlaps = 0;
        let line: string;
        while (line = await reader.read()) {
            const [first, second] = line.split(',').map(assignment => assignment.split('-').map(n => parseInt(n)));
            const start = Math.max(first[0], second[0]);
            const end = Math.min(first[1], second[1]);
            if (start <= end) {
                overlaps++;
            }
        }
        console.log(overlaps);
    }
};
