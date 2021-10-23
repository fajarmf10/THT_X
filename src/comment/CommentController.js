import express from "express";
import errorHandler from "../middleware/errorHandler";

export default class CommentController {
    constructor(app) {
        this._app = app;
        this._router = express.Router();
        this._postComment = this._postComment.bind(this);
    }

    attachRoutes() {
        this._app.use('/orgs', this._router);

        this._router.post('/:orgsId/comments', errorHandler(this._postComment));
    }

    async _postComment(request, response) {
        const {commentService} = this._app.locals.services;
        const {orgsId} = request.params;
        const {body: requestBody} = request;
        const result = await commentService.postComment(requestBody, orgsId);
        return response.status(200).json(result);
    }
}
