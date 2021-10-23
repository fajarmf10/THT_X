import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import database from './Database';
import config from '../config/index';
import Organization from "./organization/Organization";
import OrganizationService from "./organization/OrganizationService";
import CommentService from "./comment/CommentService";
import CommentController from "./comment/CommentController";
import Comment from "./comment/Comment";

const app = express();
app.use(cors());
const databaseConnection = database.connect(config.db);

const createModels = () => ({
    Organization: Organization.init(databaseConnection),
    Comment: Comment.init(databaseConnection)
});

const createServices = models => {
    const organizationService = new OrganizationService(models);
    const commentService = new CommentService(organizationService, models);
    return {
        organizationService,
        commentService
    };
}

const createControllers = () => [
    new CommentController(app)
];

const initializeControllers = () => {
    const controllers = createControllers();
    controllers.forEach((controller) => {
        controller.attachRoutes();
    });
};

const registerDependencies = () => {
    app.locals.models = createModels();
    app.locals.services = createServices(app.locals.models);
};

registerDependencies();
app.use(bodyParser.json());
initializeControllers();

export default app;
