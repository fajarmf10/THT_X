import CommentService from "../../src/comment/CommentService";
import OrganizationNotFound from "../../src/exception/OrganizationNotFound";

describe('CommentService', () => {
    let organizationService;
    let classUnderTest;
    let models;

    const commentDetail = {
        comment: 'Looking to hire SE Asia\'s top dev talent!'
    };

    const xenditOrg = {
        organizationId: 'xendit',
        organizationName: 'Xendit org'
    }

    const xenditComment = {
        commentId: 'somerandomstring',
        comment: commentDetail.comment,
        organizationId: xenditOrg.organizationId,
        isDeleted: false
    }

    beforeEach(()=> {
        organizationService = {
            findOrganization: jest.fn()
        }
        models = {
            Comment: {
                createComment: jest.fn()
            }
        }
        classUnderTest = new CommentService(organizationService, models);
    });

    describe('postComment', () => {
        it('should post comment when organization is found', async () => {
            organizationService.findOrganization.mockResolvedValue(xenditOrg);
            models.Comment.createComment.mockResolvedValue(xenditComment);

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
})
