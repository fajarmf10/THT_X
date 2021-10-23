import OrganizationService from "../../src/organization/OrganizationService";

describe('OrganizationService', () => {
    const organizationId = 'xendit';
    let serviceUnderTest;
    let models;

    const xenditOrg = {
        organizationId,
        organizationName: 'Xendit'
    }

    beforeEach(() => {
        const mockedModels = {
            Organization: {
                getOrganizationById: jest.fn().mockReturnValue(xenditOrg)
            }
        }

        serviceUnderTest = new OrganizationService(mockedModels);
        models = {...mockedModels};
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findOrganization', () => {
        it('should return Xendit organization', async () => {
            let expectedResult = {...xenditOrg};
            let actualResult = await serviceUnderTest.findOrganization('xendit');

            expect(actualResult).toMatchObject(expectedResult);
        });
    });
});
