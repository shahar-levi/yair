'use strict';

const { exec } = require('child_process');

class Dig {
    constructor(domain) {
        this.domain = domain;
        this.cmd = `dig +short _dmarc.${this.domain} txt`;
    }

    lookup() {
        const self = this;
        return new Promise(( resolve, reject ) => {
            exec(self.cmd, (error, stdout, stderr) => {
                if(error || stderr) {
                    reject('DNS lookup failed');
                }
                resolve(stdout.replace("\"",""));
            });
        });
    }
}

module.exports = Dig;
