import express from "express";
import errorHandler from "../middleware/errorHandler";
import UnknownRoutes from "../exception/UnknownRoutes";

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

        this._router.post('/:orgsId/comments', errorHandler(this._postComment));
        this._router.get('/:orgsId/comments', errorHandler(this._getAllComments));
        this._router.delete('/:orgsId/comments', errorHandler(this._deleteComments));

        this._router.get('/:orgsId/members', errorHandler(this._getAllMembers));

        this._router.all('*', errorHandler(this._unknownRoutes));
    }

    _unknownRoutes(request, response) {
        throw new UnknownRoutes();
    }

    async _postComment(request, response) {
        const {commentService} = this._app.locals.services;
        const {orgsId} = request.params;
        const {body: requestBody} = request;
        const result = await commentService.postComment(requestBody, orgsId);
        return response.status(201).json(result);
    }

    async _getAllComments(request, response) {
        const {commentService} = this._app.locals.services;
        const {orgsId} = request.params;
        const result = await commentService.getAllCommentsForOrganization(orgsId);
        return response.status(200).json(result);
    }

    async _deleteComments(request, response) {
        const {commentService} = this._app.locals.services;
        const {orgsId} = request.params;
        const totalCommentsDeleted = await commentService.deleteAllCommentsForOrganization(orgsId);
        const timestamp = new Date().toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '');
        console.log(`Deleted ${totalCommentsDeleted} comment(s) for ${orgsId} on ${timestamp}`);
        return response.status(204).json({});
    }

    async _getAllMembers(request, response) {
        const { memberService } = this._app.locals.services;
        const {orgsId} = request.params;
        const members = await memberService.getAllMemberForOrganization(orgsId);
        return response.status(200).json(members);
    }
}
