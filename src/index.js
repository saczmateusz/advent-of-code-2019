import http from 'http';
// import day from './day01/day01';
// import day from './day02/day02';
import day from './day03/day03'; // todo
// import day from './day04/day04'; // todo
// import day from './day08/day08';

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
