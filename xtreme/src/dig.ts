import {exec} from "child_process";

class Dig {

    constructor(private domain: string) {

    }

    async getDMARC(): Promise<any> {
        const cmd: string = `dig +short _dmarc.${this.domain} txt`;
        return new Promise((resolve, reject) => {
            exec(cmd, (error, stdout, stderr) => {
                if (error || stderr) {
                    reject('DMARK lookup failed');
                }
                const rawValue = stdout.replace(/\"/ig, "").trim();
                let data: any = {};
                const pairs = rawValue.split(";");
                pairs.forEach(v => {
                    const pair: string[] = v.trim().split("=");
                    if (pair.length > 1) {
                        data[pair[0]] = pair[1];
                    }
                })
                resolve(data);
            });
        });
    }

    async getMX(): Promise<any> {
        const cmd: string = `dig +noall +answer  mx ${this.domain}`;
        return new Promise((resolve, reject) => {
            exec(cmd, (error, stdout, stderr) => {
                if (error || stderr) {
                    reject('MX lookup failed');
                }
                const rawValue = stdout.replace(/\"/ig, "").trim();
                const rows = rawValue.split("\n");
                const data: { domain: string, pref: string, ttl: number, hostname: string }[] = [];
                try {


                    rows.forEach(row => {
                        const fields = row.split('\t');
                        const hostField = fields[5].split(' ');
                        const domain = fields[0];
                        const pref = hostField[0];
                        const hostname = hostField[1];
                        const ttl = (+fields[2]) / 60.0;
                        data.push({domain, pref, ttl, hostname})
                    });
                } catch {

                }
                resolve(data);
            });
        });
    }

}

export default Dig;
