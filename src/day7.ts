import Day from './day';
import { ArrayUtils, StdinReader } from './helpers';

type File = {
    name: string,
    size: number,
};

type Directory = {
    name: string,
    parent: Directory,
    children: Directory[],
    files: File[],
};

const printDirTree = (cwd: Directory, indent: number = 0) => {
    console.log(`${' '.repeat(indent)}- ${cwd.name} (dir)`);
    for (const d of cwd.children) {
        printDirTree(d, indent + 2);
    }
    for (const f of cwd.files) {
        console.log(`${' '.repeat(indent+2)}- ${f.name} (file, size=${f.size})`);
    }
}

const cd = (cwd: Directory, loc: string): Directory => {
    if (loc === '/') {
        while (cwd.parent) {
            cwd = cwd.parent;
        }
        return cwd;
    } else if (loc === '..') {
        return cwd.parent;
    } else {
        return cwd.children.filter(c => c.name === loc)[0];
    }
};

const buildDirectoryTree = async (reader: StdinReader): Promise<Directory> => {
    const root: Directory = {
        name: '/',
        parent: null,
        children: [],
        files: [],
    };

    let cwd = root;

    let line: string;
    while (line = await reader.read()) {
        // console.log(line);
        if (line.startsWith('$')) {
            const parts = line.split(' ');
            if (parts[1] === 'cd') {
                cwd = cd(cwd, parts[2]);
            } else {
                // Assume ls
            }
        } else {
            // Assume anything not a command is an ls in cwd result
            const [desc, name] = line.split(' ');
            if (desc === 'dir') {
                cwd.children.push({
                    name,
                    parent: cwd,
                    children: [],
                    files: [],
                })
            } else {
                cwd.files.push({
                    name,
                    size: parseInt(desc),
                })
            }
        }
        // console.log(cwd);
    }
    return root;
}

const directorySize = (dir: Directory): number => {
    const fileSize = ArrayUtils.sum(dir.files.map(f => f.size));
    const subdirSize = ArrayUtils.sum(dir.children.map(d => directorySize(d)));
    return fileSize + subdirSize;
}

const enumDirectories = (dir: Directory): Directory[] => {
    return [dir, ...dir.children.flatMap(d => enumDirectories(d))];
}

export default class Day7 implements Day {
    async part1() {
        const reader = new StdinReader();
        const root = await buildDirectoryTree(reader);

        // printDirTree(root);

        const dirs = enumDirectories(root);
        const sum = ArrayUtils.sum(dirs.map(d => directorySize(d)).filter(s => s <= 100000));
        console.log(sum);
    }

    async part2() {
        const reader = new StdinReader();
        const root = await buildDirectoryTree(reader);

        // printDirTree(root);

        const diskSize = 70000000;
        const freeTarget = 30000000;

        const dirs = enumDirectories(root).map(d => ({ dir: d, size: directorySize(d) }));
        const used = dirs.filter(d => d.dir.name === '/')[0].size;
        const needed = freeTarget - (diskSize - used);
        // console.log(`${used}/${diskSize}, used=${used}, needed=${needed}`);

        const options = dirs.filter(d => d.size >= needed).sort((a, b) => a.size - b.size);
        // for (const d of options) {
        //     console.log(`${d.dir.name}, ${d.size}`);
        // }
        console.log(options[0].size);
        
        // console.log(sum);
    }
};
