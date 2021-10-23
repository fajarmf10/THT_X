import error from 'http-error';

const { NotFound } = error;

export default class OrganizationNotFound extends NotFound {
    constructor() {
        super('Organization not found!');
    }
}
