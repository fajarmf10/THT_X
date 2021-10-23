export default class CommentService {
    constructor(organizationService, models) {
        this._models = models;
        this._organizationService = organizationService;
    }

    async checkOrganization(organizationId) {
        try {
            await this._organizationService.findOrganization(organizationId);
        } catch (error) {
            throw error;
        }
    }

    async postComment(commentDetail, organizationId) {
        const { Comment } = this._models;
        await this.checkOrganization(organizationId);
        return await Comment.createComment(commentDetail, organizationId);
    }
}
