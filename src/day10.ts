import Day from './day';
import { ArrayUtils, StdinReader } from './helpers';

export default class Day10 implements Day {
    async part1() {
        const reader = new StdinReader();

        let x = 1;
        let cycle = 1;
        let signals: number[] = [];

        const registerSignal = (cycle: number, x: number) => {
            if ((cycle - 20) % 40 === 0) {
                signals.push(cycle * x);
            }
        };

        let line: string;
        while (line = await reader.read()) {
            switch (line.substring(0, 4)) {
                case 'noop':
                    registerSignal(cycle, x);
                    cycle++;
                    break;
                case 'addx':
                    const val = parseInt(line.substring(5));
                    registerSignal(cycle, x);
                    registerSignal(cycle+1, x);
                    x += val;
                    cycle += 2;
                    break;
            }
        }

        console.log(signals);
        const sum = ArrayUtils.sum(signals);
        console.log(sum);
    }

    async part2() {
        const reader = new StdinReader();

        let x = 1;
        let cycle = 1;

        let output = '';

        const index = (cycle: number) => (cycle - 1) % 40 + 1;
        const flush = () => {
            if (output.length >= 40) {
                console.log(output);
                output = '';
            }
        };

        let line: string;
        while (line = await reader.read()) {
            switch (line.substring(0, 4)) {
                case 'noop':
                    output += (index(cycle) >= x && index(cycle) < x + 3 ? '#' : '.');
                    cycle++;
                    break;
                case 'addx':
                    const val = parseInt(line.substring(5));
                    output += (index(cycle) >= x && index(cycle) < x + 3 ? '#' : '.');
                    flush();
                    output += (index(cycle+1) >= x && index(cycle+1) < x + 3 ? '#' : '.');
                    x += val;
                    cycle += 2;
                    break;
            }
            flush();
        }
    }
};
