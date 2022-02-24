import express from 'express';
import xtreme from './routes';
// rest of the code remains same

class App {
    private readonly PORT: number = 3033;
    private app;
    private static _instance: App;

    private constructor() {
        this.app = express();
    }

    run() {
        this.app.use('/xtreme',xtreme)
        this.app.listen(this.PORT, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${this.PORT}`);
        });
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

App.Instance.run();

