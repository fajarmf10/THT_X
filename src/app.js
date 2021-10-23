import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import database from './Database';
import config from '../config/index';
import Organization from "./organization/Organization";
import OrganizationService from "./organization/OrganizationService";

const app = express();
app.use(cors());
const databaseConnection = database.connect(config.db);

const createModels = () => ({
    Organization: Organization.init(databaseConnection)
});

const createServices = models => ({
    organizationService: new OrganizationService(models)
});

const registerDependencies = () => {
    app.locals.models = createModels();
    app.locals.services = createServices(app.locals.models);
};

registerDependencies();
app.use(bodyParser.json());

export default app;
