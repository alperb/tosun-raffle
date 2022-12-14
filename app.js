const _ = require('lodash');
const express = require('express');
const crypto = require('crypto');
const app = express();

const tosuns = [
    {
        name: 'Alper',
        password: '2de78ce8f276cfe75ebde23fd937b436'
    },
    {
        name: 'Edip',
        password: '77bbcdcccc367d9db0bcedb9163a6513'
    },
    {
        name: 'Bilgehan',
        password: '178e30d60870967198c39feb93e46386'
    },
    {
        name: 'Emirhan',
        password: 'd41d8cd98f00b204e9800998ecf8427e'
    }
];

const raffle = {};

function runRaffle(){
    const l = tosuns.reduce((acc, tosun) => {
        acc.push(tosun);
        return acc;
    }, []);

    const randomized = _.shuffle(l);
    randomized.forEach((tosun, index) => {
        raffle[tosun.password] = randomized[index + 1] || randomized[0];
    });
}

app.get('/:password', (req, res) => {
    const password = req.params.password;
    const hash = crypto.createHash('md5').update(password).digest('hex');
    const tosun = tosuns.find(tosun => tosun.password === hash);
    if(!tosun){
        res.send('Bu sifreyi kullanan bir Tosun bulunamadi!');
        return;
    }
    res.send(raffle[hash].name);
});

runRaffle();

console.log({raffle});

app.listen(3131, () => console.log('Server is ready!'));