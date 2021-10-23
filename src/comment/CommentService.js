export default class CommentService {
    constructor(organizationService, models) {
        this._models = models;
        this._organizationService = organizationService;
    }

    async _getOrganization(organizationId) {
        try {
            return await this._organizationService.findOrganization(organizationId);
        } catch (error) {
            throw error;
        }
    }

    async postComment(commentDetail, organizationId) {
        const {comment} = commentDetail;
        const organization = await this._getOrganization(organizationId);
        const isDeleted = false;
        const newComment = {
            comment,
            isDeleted
        }
        return organization.createComment(newComment);
    }

    async getAllCommentsForOrganization(organizationId) {
        const organization = await this._getOrganization(organizationId);
        return await organization.getComments();
    }

    async deleteAllCommentsForOrganization(organizationId) {
        const organization = await this._getOrganization(organizationId);
        const {Comment} = this._models;
        return await Comment.updateAll(organization);
    }
}
