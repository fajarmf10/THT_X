import http from 'http';

export default class Server {
    constructor(app, config) {
        this._app = app;
        this._config = config;
        this._server = null;
    }

    start() {
        const { applicationPort, applicationName } = this._config;
        this._server = http.createServer(this._app);
        this._server.listen(applicationPort);
        console.log(`Application ${applicationName} started on Port ${applicationPort}!`)
    }

    stop() {
        this._server.close();
    }
}
