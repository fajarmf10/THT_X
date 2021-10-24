export default class MemberService {
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

    async getAllMemberForOrganization(organizationId) {
        const organization = await this._getOrganization(organizationId);
        const {Member} = this._models;
        return await Member.getMembersOfOrganizationAndSortByHighestFollower(organization);
    }
}
