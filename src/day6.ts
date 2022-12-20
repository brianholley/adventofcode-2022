import Day from './day';
import { StdinReader } from './helpers';

const isStartOfMessage = (buffer: string[]) => {
    return new Set(buffer).size === buffer.length;
};

export default class Day6 implements Day {
    async part1() {
        const reader = new StdinReader();

        let line: string;
        while (line = await reader.read()) {
            const buffer = ['0', '0', '0', '0'];
            let b=0;
            for (let i=0; i < line.length; i++) {
                buffer[b] = line[i];
                if (i >= 4 && isStartOfMessage(buffer)) {
                    console.log(i+1);
                    break;
                }
                b = (b + 1) % 4;
            }
        }
    }

    async part2() {
        const reader = new StdinReader();

        let line: string;
        while (line = await reader.read()) {
            const buffer = new Array(14).fill('0');
            let b=0;
            for (let i=0; i < line.length; i++) {
                buffer[b] = line[i];
                if (i >= buffer.length && isStartOfMessage(buffer)) {
                    console.log(i+1);
                    break;
                }
                b = (b + 1) % buffer.length;
            }
        }
    }
};
