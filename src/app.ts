import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

class app {
   public server: express.Application;

   constructor() {
      this.server = express();
      this.middlewares();
      this.routes();
   }
   middlewares() {
      this.server.use(express.json({limit:"16mb", strict: true}));
      this.server.use(express.urlencoded({limit:"16mb", extended: true}));
      this.server.use(cors())
   }
   routes() {
      this.server.get('/', (req, res) => {
         res.status(200).json({
            meta: {
               status: 200,
               message: 'OK'
            },
            data: "HI From Backend"
         })
      })
      // this.server.use('/api');
   }
}

export default new app().server