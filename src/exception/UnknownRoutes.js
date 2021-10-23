import error from 'http-error';

const { NotFound } = error;

export default class UnknownRoutes extends NotFound {
    constructor() {
        super('Unknown Service!');
    }
}
