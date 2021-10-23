import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import database from './Database';
import config from '../config/index';

const app = express();
app.use(cors());
const databaseConnection = database.connect(config.db);

app.use(bodyParser.json());

export default app;
