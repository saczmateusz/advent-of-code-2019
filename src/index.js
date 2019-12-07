import http from 'http';
import day01 from './day01/day01';

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Advent of Code 2019!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

day01.runScript();
