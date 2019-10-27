"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
class OthersRouter extends router_1.Router {
    applyRouters(application) {
        application.get('/hello', (req, resp, next) => {
            //resp.contentType = 'application/json';
            //resp.send({message:'Hello!'})
            resp.json({ message: 'Hello' });
            return next();
        });
        application.get('/info', [
            (req, res, next) => {
                if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {
                    //res.status(400)
                    //res.json({message:'Por favor, atualize o seu navegador'})
                    //return next(false)
                    // ou
                    let error = new Error();
                    error.statusCode = 400;
                    error.message = 'Please, update your browser';
                    return next(error);
                }
                return next();
            },
            (req, res, next) => {
                res.json({
                    browser: req.userAgent(),
                    method: req.method,
                    url: req.href(),
                    path: req.path(),
                    query: req.query
                });
                return next();
            }
        ]);
    }
}
exports.othersRouter = new OthersRouter();
