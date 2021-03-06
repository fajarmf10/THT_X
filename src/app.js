import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import database from './Database';
import config from '../config/index';
import Organization from "./organization/Organization";
import OrganizationService from "./organization/OrganizationService";
import CommentService from "./comment/CommentService";
import OrganizationController from "./organization/OrganizationController";
import Comment from "./comment/Comment";
import Member from "./member/Member";
import MemberService from "./member/MemberService";

const app = express();
app.use(cors());
const databaseConnection = database.connect(config.db);
databaseConnection.sync();

const createModels = () => ({
    Organization: Organization.init(databaseConnection),
    Comment: Comment.init(databaseConnection),
    Member: Member.init(databaseConnection)
});

const createServices = models => {
    const organizationService = new OrganizationService(models);
    const commentService = new CommentService(organizationService, models);
    const memberService = new MemberService(organizationService, models);
    return {
        organizationService,
        commentService,
        memberService
    };
}

const createControllers = () => [
    new OrganizationController(app)
];

const initializeControllers = () => {
    const controllers = createControllers();
    controllers.forEach((controller) => {
        controller.attachRoutes();
    });
};

const initializeAssociation = (models) => {
    models.Organization.associate(models);
    models.Comment.associate(models);
    models.Member.associate(models);
};

const registerDependencies = () => {
    app.locals.models = createModels();
    app.locals.services = createServices(app.locals.models);
};

registerDependencies();
app.use(bodyParser.json());
initializeControllers();
initializeAssociation(app.locals.models);

app.use((error, request, response, _) => {
    const errorObject = {
        statusCode: error.statusCode,
        message: error.message
    };
    const {url, method} = request;
    const loggingObject = {...errorObject, endpoint: url, method}
    console.log(loggingObject);
    return response.status(error.statusCode).json(errorObject);
});

export default app;
