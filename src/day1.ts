import Day from './day';
import { ArrayUtils, StdinReader } from './helpers';

export default class Day1 implements Day {
    async part1() {
        const reader = new StdinReader();

        let max = 0;
        let sum = 0;
        let line: string;
        while ((line = await reader.read()) !== null) {
            if (line.length > 0) {
                sum += parseInt(line);
                if (sum > max) {
                    max = sum;
                }
            } else {
                sum = 0;
            }
        }

        console.log(max);
    }

    async part2() {
        const reader = new StdinReader();

        let max = [0, 0, 0];
        let sum = 0;
        let line: string;
        while ((line = await reader.read()) !== null) {
            if (line.length > 0) {
                sum += parseInt(line);
            } else {
                max.push(sum);
                max = max.sort().reverse().slice(0, 3);

                sum = 0;
            }
        }

        console.log(max);
        console.log(ArrayUtils.sum(max));
    }
};
