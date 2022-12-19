import Day from './day';
import { StdinReader } from './helpers';

type Result = 'win' | 'draw' | 'lose';

const play = (opponent: string, move: string): Result => {
    if ((opponent.charCodeAt(0) - 'A'.charCodeAt(0) + 1) % 3 === move.charCodeAt(0) - 'X'.charCodeAt(0)) {
        return 'win';
    }
    if (opponent.charCodeAt(0) - 'A'.charCodeAt(0) === move.charCodeAt(0) - 'X'.charCodeAt(0)) {
        return 'draw';
    }
    return 'lose';
};

const moveForResult = (opponent: string, result: Result) => {
    switch (result) {
        case 'win':
            return String.fromCharCode((opponent.charCodeAt(0) - 'A'.charCodeAt(0) + 1) % 3 + 'X'.charCodeAt(0));
        case 'draw':
            return String.fromCharCode(opponent.charCodeAt(0) - 'A'.charCodeAt(0) + 'X'.charCodeAt(0));
        case 'lose':
            return String.fromCharCode((opponent.charCodeAt(0) - 'A'.charCodeAt(0) + 2) % 3 + 'X'.charCodeAt(0));
    }
};

const outcomeScore = {
    'win': 6,
    'draw': 3,
    'lose': 0,
};

const moveScore = {
    'X': 1,
    'Y': 2,
    'Z': 3,
};

const resultSuggestion = {
    'X': 'lose',
    'Y': 'draw',
    'Z': 'win',
};

export default class Day2 implements Day {
    async part1() {
        const reader = new StdinReader();

        let score = 0;
        let line: string;
        while (line = await reader.read()) {
            const [opponent, suggestion] = line.split(' ');
            const outcome = play(opponent, suggestion);
            score += outcomeScore[outcome];
            score += moveScore[suggestion];
        }

        console.log(score);
    }

    async part2() {
        const reader = new StdinReader();

        let score = 0;
        let line: string;
        while (line = await reader.read()) {
            const [opponent, suggestion] = line.split(' ');
            const outcome = resultSuggestion[suggestion] as Result;
            const move = moveForResult(opponent, outcome);
            score += outcomeScore[outcome];
            score += moveScore[move];
        }

        console.log(score);
    }
};
