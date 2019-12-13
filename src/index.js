import http from 'http';

// import day from './day01/day01';
// import day from './day02/day02';
// import day from './day03/day03';
// import day from './day04/day04';
import day from './day05/day05';
// import day from './day06/day06';
// import day from './day07/day07'; // to reformat
// import day from './day08/day08';
// import day from './day09/day09'; // to reformat
// import day from './day10/day10'; // wtfisthiscode
// import day from './day11/day11'; // todo
// import day from './day12/day12'; // todo
// import day from './day13/day13'; // todo

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Advent of Code 2019!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

day.runScript();
