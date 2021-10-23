import express from "express";

export default class CommentController {
    constructor(app) {
        this._app = app;
        this._router = express.Router();
        this._postComment = this._postComment.bind(this);
    }

    attachRoutes() {
        this._app.use('/orgs', this._router);

        this._router.post('/:orgsId/comments', this._postComment);
    }

    async _postComment(request, response) {
        const {commentService} = this._app.locals.services;
        const {orgsId} = request.params;
        const {body: requestBody} = request;
        const result = await commentService.postComment(requestBody, orgsId);
        return response.json(result);
    }
}
