'use strict';
const fs = require('fs');

class Rockyou {
    static rockyou = '';
    static #filename = './rockyou.txt';

    static getRockYou() {
        if (this.rockyou === '') {
            this.rockyou = fs.readFileSync(Rockyou.#filename, 'utf8');
        }
    }
}

module.exports = Rockyou;