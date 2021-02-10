import express, { Request, Application, Router } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import MasterRouter from './routers/MasterRouter';
import pool from './dbconfig/dbconnector';

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }

    private config() {
        
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(session({secret: 'keyboard cat'}))
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