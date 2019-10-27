"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_handler_1 = require("./error.handler");
class Server {
    initializeDb() {
        console.log("\x1b[44m Inicializado em: ", new Date().toLocaleString(), "\x1b[0m");
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });
                this.application.use(restify.plugins.queryParser()); //setado para obter querys em formato json
                this.application.use(restify.plugins.bodyParser()); //
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                this.application.listen(environment_1.environment.server.port, () => {
                    console.log('API rodando em http://localhost:', environment_1.environment.server.port);
                    resolve(this.application);
                });
                //routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.on('restifyError', error_handler_1.handleError);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
