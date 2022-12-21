import Day1 from "./day1";
import Day10 from "./day10";
import Day2 from "./day2";
import Day3 from "./day3";
import Day4 from "./day4";
import Day5 from "./day5";
import Day6 from "./day6";
import Day7 from "./day7";
import Day8 from "./day8";
import Day9 from "./day9";

const days = [
    null,
    new Day1(),
    new Day2(),
    new Day3(),
    new Day4(),
    new Day5(),
    new Day6(),
    new Day7(),
    new Day8(),
    new Day9(),
    new Day10(),
];

const usage = () => {
    console.log('Usage: npm run day {day number} {part number}');
};

// 0 - exe
// 1 - this file
// 2 - start of command line args
if (process.argv.length < 4) {
    usage();
    process.exit();
}

const dayNumber = parseInt(process.argv[2]);
const partNumber = parseInt(process.argv[3]);
console.log(`Day ${dayNumber}, Part ${partNumber}`);

if (dayNumber >= days.length) {
    usage();
    process.exit();
}

const day = days[dayNumber];

switch (partNumber) {
    case 1:
        day.part1();
        break;
    case 2:
        day.part2();
        break;
    default:
        usage();
        process.exit();
}
