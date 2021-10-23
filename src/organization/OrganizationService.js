import OrganizationNotFound from "../exception/OrganizationNotFound";

export default class OrganizationService {
    constructor(models) {
        this._models = models;
    }

    async findOrganization(organizationId) {
        const { Organization } = this._models;
        let result = await Organization.getOrganizationById(organizationId);
        if (result === null) {
            throw new OrganizationNotFound();
        }
        return result;
    }
}
