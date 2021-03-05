import express, { Request, Application, Router } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import MasterRouter from './routers/MasterRouter';
import pool from './dbconfig/dbconnector';
// import jwt from 'express-jwt';
const expressJwt = require('express-jwt');
// import jwtAuthz from 'express-jwt-authz';

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }

    private config() {
        // logging middleware
        this.app.use((req, res, next) => {
            const foo = `[${new Date().toISOString()}] ${req.method}:  ${req.url}`
           console.log(foo)
           next()
        })
        // allow cross origin middleware
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization, Content-Language");
            next()
        })
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json());
        // filter of unauthorized requests
        this.app.use(expressJwt({secret: 'app-super-shared-secret', algorithms: ['HS256']}).unless({path: ['/api/auth/login']}));
        this.app.use(cookieParser());
    }

    private dbConnect() {
        pool.connect(function (err: any) {
            if (err) throw new Error(err);
            console.log('Connected');
        }); 
    }
    
    private routerConfig() {
        this.app.use('/api', MasterRouter);
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;