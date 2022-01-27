import express from 'express';
import config from 'config';
import cors from 'cors';
import connect from './utils/database';
import logger from './utils/logger';
import deserializeUser from "./middleware/deserializerUser";
import router from './routes';

const port = config.get<number>('port');

const app = express();

app.use(cors());
app.use(express.json());
app.use(deserializeUser);
app.use(router);

app.listen(port, async() => {
    logger.info('APP is running in port ' + port);
    await connect();
});