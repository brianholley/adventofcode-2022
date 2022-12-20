import Day from './day';
import { StdinReader } from './helpers';

export default class Day3 implements Day {
    async part1() {
        const reader = new StdinReader();

        let sum = 0;
        let line: string;
        while (line = await reader.read()) {

            const first = line.substring(0, line.length/2).split('');
            const second = new Set(line.substring(line.length/2).split(''));
            const common = first.filter(i => second.has(i))[0];
            if (common >= 'a' && common <= 'z') {
                sum += common.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
            } else if (common >= 'A' && common <= 'Z') {
                sum += common.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
            }
        }
        console.log(sum);
    }

    async part2() {
        const reader = new StdinReader();

        let sum = 0;
        let line: string;
        while (line = await reader.read()) {

            const first = line.split('');
            const second = new Set((await reader.read()).split(''));
            const third = new Set((await reader.read()).split(''));

            const common = first.filter(i => second.has(i)).filter(i => third.has(i))[0];
            if (common >= 'a' && common <= 'z') {
                sum += common.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
            } else if (common >= 'A' && common <= 'Z') {
                sum += common.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
            }
        }
        console.log(sum);
    }
};
