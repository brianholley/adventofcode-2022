import * as readline from 'readline';

export class StdinReader {

    buffer: string[] = [];
    closed: boolean = false;
    currentPromise: Promise<string | null>;

    constructor() {
        const rl = readline.createInterface({
            input: process.stdin,
        });
    
        rl.on('line', (line) => {
            this.buffer.push(line);
        });
    
        rl.once('close', () => {
            this.closed = true;
        });
    }

    async read(): Promise<string | null> {
        this.currentPromise = new Promise(async (resolve, _) => {
            do {
                const line = this.buffer.shift();
                if (line !== undefined) {
                    resolve(line);
                    break;
                }
                if (this.closed) {
                    resolve(null);
                    break;
                }
                await new Promise((r) => setTimeout(r, 100));
            } while (true);
        });
        return this.currentPromise;
    }

    async read2dArray(): Promise<number[][]> {
        const array: number[][] = [];

        let line: string;
        while (line = await this.read()) {
            array.push(line.split('').map(c => parseInt(c)));
        }

        return array;
    }
}

export class ArrayUtils {
    static sum(arr: number[]) {
        return arr.reduce((prev, curr) => prev + curr, 0);
    }
}