import CommentService from "../../src/comment/CommentService";
import OrganizationNotFound from "../../src/exception/OrganizationNotFound";

describe('CommentService', () => {
    let organizationService;
    let classUnderTest;
    let models;

    const commentDetail = {
        comment: 'Looking to hire SE Asia\'s top dev talent!'
    };

    const sequelizeMethod = {
        createComment: jest.fn(),
        getComments: jest.fn()
    }

    const xenditOrg = {
        organizationId: 'xendit',
        organizationName: 'Xendit org',
        ...sequelizeMethod
    }

    const xenditComment = {
        commentId: 'somerandomstring',
        comment: commentDetail.comment,
        organizationId: xenditOrg.organizationId,
        isDeleted: false
    }

    const commentsOnXendit = [
        {
            commentId: 'anotherRandomString',
            comment: 'here is something to tell',
            organizationId: xenditOrg.organizationId,
            isDeleted: false
        },
        xenditComment
    ]

    beforeEach(()=> {
        organizationService = {
            findOrganization: jest.fn()
        }
        models = {
            Comment: {}
        }
        classUnderTest = new CommentService(organizationService, models);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('postComment', () => {
        it('should post comment when organization is found', async () => {
            organizationService.findOrganization.mockResolvedValue(xenditOrg);
            xenditOrg.createComment.mockResolvedValue(xenditComment);

            let actualResult = await classUnderTest.postComment(commentDetail, xenditOrg.organizationId);

            expect(organizationService.findOrganization).toHaveBeenCalledTimes(1);
            expect(organizationService.findOrganization).toHaveBeenCalledWith(xenditOrg.organizationId);
            expect(actualResult).toEqual(xenditComment);
        });

        it('should throw OrganizationNotFound when organization is not found', async () => {
            const organizationNotFound = new OrganizationNotFound();
            organizationService.findOrganization.mockRejectedValue(organizationNotFound);

            const invocationMethod = () => classUnderTest.postComment(commentDetail, 'lestari');

            await expect(invocationMethod).rejects
                .toThrow(organizationNotFound);
            expect(organizationService.findOrganization).toHaveBeenCalledTimes(1);
            expect(organizationService.findOrganization).toHaveBeenCalledWith('lestari');
            expect(organizationService.findOrganization).not.toHaveBeenCalledWith('xendit');
        });
    })

    describe('getAllCommentsForOrganization', () => {
        it('should throw OrganizationNotFound when organization is not found', async () => {
            const organizationNotFound = new OrganizationNotFound();
            organizationService.findOrganization.mockRejectedValue(organizationNotFound);

            const invocationMethod = () => classUnderTest.getAllCommentsForOrganization('lestari');

            await expect(invocationMethod).rejects
                .toThrow(organizationNotFound);
            expect(organizationService.findOrganization).toHaveBeenCalledTimes(1);
            expect(organizationService.findOrganization).toHaveBeenCalledWith('lestari');
            expect(organizationService.findOrganization).not.toHaveBeenCalledWith('xendit');
        });

        it('should return list of comments by organization ID', async () => {
            organizationService.findOrganization.mockResolvedValue(xenditOrg);
            xenditOrg.getComments.mockResolvedValue(commentsOnXendit);

            const actualResult = await classUnderTest.getAllCommentsForOrganization('xendit');

            expect(actualResult).not.toBeNull();
            expect(actualResult).not.toBeUndefined();
            expect(actualResult.length).toEqual(2);
            expect(actualResult).toMatchObject(commentsOnXendit);
            expect(xenditOrg.getComments).toHaveBeenCalledTimes(1);
        });

        it('should return empty list of comments if organization doesnt have any comment', async () => {
            organizationService.findOrganization.mockResolvedValue(xenditOrg);
            xenditOrg.getComments.mockResolvedValue([]);

            const actualResult = await classUnderTest.getAllCommentsForOrganization('lestari');

            expect(actualResult).not.toBeNull();
            expect(actualResult).not.toBeUndefined();
            expect(actualResult.length).toEqual(0);
            expect(actualResult).toMatchObject([]);
            expect(xenditOrg.getComments).toHaveBeenCalledTimes(1);
        });
    })
})
