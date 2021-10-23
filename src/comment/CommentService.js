export default class CommentService {
    constructor(organizationService, models) {
        this._models = models;
        this._organizationService = organizationService;
    }

    async postComment(commentDetail, organizationId) {
        const { Comment } = this._models;
        try {
            await this._organizationService.findOrganization(organizationId);
        } catch (error) {
            throw error;
        }
        return await Comment.createComment(commentDetail, organizationId);
    }
}
