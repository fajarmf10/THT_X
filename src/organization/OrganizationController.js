import express from "express";
import errorHandler from "../middleware/errorHandler";
import UnknownRoutes from "../exception/UnknownRoutes";
import requestValidator from "../middleware/requestValidator";
import postCommentValidator from "../validation/postCommentValidator";
import organizationIdValidator from "../validation/organizationIdValidator";

export default class OrganizationController {
    constructor(app) {
        this._app = app;
        this._router = express.Router();
        this._postComment = this._postComment.bind(this);
        this._getAllComments = this._getAllComments.bind(this);
        this._unknownRoutes = this._unknownRoutes.bind(this);
        this._deleteComments = this._deleteComments.bind(this);
        this._getAllMembers = this._getAllMembers.bind(this);
    }

    attachRoutes() {
        this._app.use('/orgs', this._router);

        this._router.post(
            '/:orgId/comments',
            requestValidator('params', organizationIdValidator),
            requestValidator('body', postCommentValidator),
            errorHandler(this._postComment)
        );
        this._router.get(
            '/:orgId/comments',
            requestValidator('params', organizationIdValidator),
            errorHandler(this._getAllComments)
        );
        this._router.delete(
            '/:orgId/comments',
            requestValidator('params', organizationIdValidator),
            errorHandler(this._deleteComments)
        );

        this._router.get(
            '/:orgId/members',
            requestValidator('params', organizationIdValidator),
            errorHandler(this._getAllMembers)
        );

        this._router.all('*', errorHandler(this._unknownRoutes));
    }

    _unknownRoutes(request, response) {
        throw new UnknownRoutes();
    }

    async _postComment(request, response) {
        const {commentService} = this._app.locals.services;
        const {orgId} = request.params;
        const {body: requestBody} = request;
        const result = await commentService.postComment(requestBody, orgId);
        return response.status(201).json(result);
    }

    async _getAllComments(request, response) {
        const {commentService} = this._app.locals.services;
        const {orgId} = request.params;
        const result = await commentService.getAllCommentsForOrganization(orgId);
        return response.status(200).json(result);
    }

    async _deleteComments(request, response) {
        const {commentService} = this._app.locals.services;
        const {orgId} = request.params;
        const totalCommentsDeleted = await commentService.deleteAllCommentsForOrganization(orgId);
        const timestamp = new Date().toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '');
        console.log(`Deleted ${totalCommentsDeleted} comment(s) for ${orgId} on ${timestamp}`);
        return response.status(204).json({});
    }

    async _getAllMembers(request, response) {
        const { memberService } = this._app.locals.services;
        const {orgId} = request.params;
        const members = await memberService.getAllMemberForOrganization(orgId);
        return response.status(200).json(members);
    }
}
