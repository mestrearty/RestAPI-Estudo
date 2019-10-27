import * as restify from "restify";
import * as mongoose from 'mongoose';
import {environment} from "../common/environment";
import {Router} from '../common/router';
import {mergePatchBodyParser} from "./merge-patch.parser";
import {handleError} from "./error.handler";

export class Server{

    application: restify.Server

    initializeDb(){
        console.log("\x1b[44m Inicializado em: ",  new Date().toLocaleString(), "\x1b[0m");
        (<any> mongoose).Promise = global.Promise
        return mongoose.connect(environment.db.url,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

    }

    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject) => {
            try{
                this.application = restify.createServer({
                    name: 'meat-api',
                    version:'1.0.0'
                })

                this.application.use(restify.plugins.queryParser()) //setado para obter querys em formato json
                this.application.use(restify.plugins.bodyParser()) //
                this.application.use(mergePatchBodyParser)
                this.application.listen(environment.server.port,()=>{
                    console.log('API rodando em http://localhost:', environment.server.port)
                    resolve(this.application)
                })

                //routes
                for (let router of routers){
                    router.applyRoutes(this.application)
                }

                this.application.on('restifyError', handleError)

            }catch(error){
                reject(error)
            }
        })
    }

    bootstrap(routers: Router[]=[]): Promise<Server>{
        return  this.initializeDb().then(()=>
                this.initRoutes(routers).then(()=> this))
    }

}