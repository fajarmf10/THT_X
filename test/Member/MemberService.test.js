import MemberService from "../../src/member/MemberService";
import OrganizationNotFound from "../../src/exception/OrganizationNotFound";

describe('MemberService', () => {
    let organizationService;
    let classUnderTest;
    let models;

    const sequelizeMethod = {
        createComment: jest.fn(),
        getComments: jest.fn()
    }

    const xenditOrg = {
        organizationId: 'xendit',
        organizationName: 'Xendit org',
        ...sequelizeMethod
    }

    const googleOrg = {
        organizationId: 'google',
        organizationName: 'Google org',
        ...sequelizeMethod
    }

    beforeEach(() => {
        organizationService = {
            findOrganization: jest.fn()
        }

        models = {
            Member: {
                getMembersOfOrganizationAndSortByHighestFollower: jest.fn()
            }
        }

        classUnderTest = new MemberService(organizationService, models);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllMemberForOrganization', () => {
        const memberA = {
            id: '123',
            login: 'alice',
            avatarUrl: 'https://google.com/alice1.png',
            followers: 27,
            following: 2
        }

        const memberB = {
            id: '125',
            login: 'bob',
            avatarUrl: 'https://google.com/bob2.png',
            followers: 192,
            following: 282
        }

        const members = [memberA, memberB];

        it('should return list of members ordered by followers when organization is found', async () => {
            organizationService.findOrganization.mockResolvedValue(xenditOrg);
            models.Member.getMembersOfOrganizationAndSortByHighestFollower.mockResolvedValue(members);

            const actualResult = await classUnderTest.getAllMemberForOrganization('xendit');

            expect(actualResult).not.toBeNull();
            expect(actualResult).not.toBeUndefined();
            expect(models.Member.getMembersOfOrganizationAndSortByHighestFollower).toHaveBeenCalledTimes(1);
            expect(models.Member.getMembersOfOrganizationAndSortByHighestFollower).toHaveBeenCalledWith(xenditOrg);
            expect(actualResult.length).toEqual(2);
            expect(actualResult).toContain(memberA);
            expect(actualResult).toContain(memberB);
        });

        it('should return empty list of member when organization is found but has no member', async () => {
            organizationService.findOrganization.mockResolvedValue(googleOrg);
            models.Member.getMembersOfOrganizationAndSortByHighestFollower.mockResolvedValue([]);

            const actualResult = await classUnderTest.getAllMemberForOrganization('google');

            expect(actualResult).not.toBeNull();
            expect(actualResult).not.toBeUndefined();
            expect(models.Member.getMembersOfOrganizationAndSortByHighestFollower).toHaveBeenCalledTimes(1);
            expect(models.Member.getMembersOfOrganizationAndSortByHighestFollower).toHaveBeenCalledWith(googleOrg);
            expect(models.Member.getMembersOfOrganizationAndSortByHighestFollower).not.toHaveBeenCalledWith(xenditOrg);
            expect(actualResult.length).toEqual(0);
            expect(actualResult).not.toContain(memberA);
            expect(actualResult).not.toContain(memberB);
        });

        it('should throw OrganizationNotFound when organization is not found', async () => {
            const organizationNotFound = new OrganizationNotFound();
            organizationService.findOrganization.mockRejectedValue(organizationNotFound);

            const invocationMethod = () => classUnderTest.getAllMemberForOrganization('abcdef');

            await expect(invocationMethod).rejects
                .toThrow(organizationNotFound);
            expect(organizationService.findOrganization).toHaveBeenCalledTimes(1);
            expect(organizationService.findOrganization).toHaveBeenCalledWith('abcdef');
            expect(organizationService.findOrganization).not.toHaveBeenCalledWith('xendit');
        });
    })
});
