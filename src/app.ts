import express from 'express';
import cors from 'cors';
import db from './utils/database';
import appRouter from './routes';
import bodyParser from 'body-parser';

class app {
   public server: express.Application;

   constructor() {
      this.server = express();
      this.middlewares();
      this.routes();
   }
   async middlewares() {
      const database = await db();
      console.log(database);
      this.server.use(cors())
   }

   routes() {
      this.server.use(bodyParser.json());
      this.server.use(bodyParser.urlencoded());
      this.server.get('/', (req, res) => {
         res.status(200).json({
            meta: {
               status: 200,
               message: 'OK'
            },
            data: "HI From Backend"
         })
      })
      this.server.use('/api', appRouter);
   }
}

export default new app().server