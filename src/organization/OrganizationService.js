export default class OrganizationService {
    constructor(models) {
        this._models = models;
    }

    async findOrganization(organizationId) {
        const { Organization } = this._models;
        return await Organization.getOrganizationById(organizationId);
    }
}
