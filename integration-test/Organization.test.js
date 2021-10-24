import request from 'supertest';
import {DataTypes} from "sequelize";
import database from "../src/Database";
import Comment from "../src/comment/Comment";
import Organization from "../src/organization/Organization";
import app from '../src/app';
import Member from "../src/member/Member";

describe('# Application Test', () => {
    let databaseConnection;
    const applicationConfig = {
        applicationPort: 8012,
        applicationName: 'Organizations-API',
        db: {
            name: 'organizations',
            username: 'postgres',
            password: 'halosemua',
            host: '127.0.0.1',
            dialect: 'postgres',
            port: 5430
        }
    };
    let organizationModel;
    let commentModel;
    let memberModel;

    beforeAll(async () => {
        databaseConnection = database.connect(applicationConfig.db);
        await databaseConnection.sync();
        let status;

        try {
            await databaseConnection.authenticate();
            status = 'Connection has been established successfully.';
        } catch (error) {
            status = 'Unable to connect to the database';
            console.error('Unable to connect to the database:', error);
        }
        expect(status).toEqual('Connection has been established successfully.');

        organizationModel = Organization.init(databaseConnection);
        commentModel = Comment.init(databaseConnection);
        memberModel = Member.init(databaseConnection);
        organizationModel.associate({Organization: organizationModel, Comment: commentModel, Member: memberModel})
        commentModel.associate({Organization: organizationModel, Comment: commentModel, Member: memberModel})
        memberModel.associate({Organization: organizationModel, Comment: commentModel, Member: memberModel})

        await initializeTables();
    })

    afterAll(async () => {
        // await dropTables();
    })

    async function dropTables() {
        const queryInterface = databaseConnection.getQueryInterface();

        await queryInterface.dropTable('organization');
        await queryInterface.dropTable('comment');
    }

    async function initializeTables() {
        const queryInterface = databaseConnection.getQueryInterface();

        await queryInterface.createTable('organization', {
            id: {
                allowNull: false,
                type: DataTypes.STRING,
                primaryKey: true,
                field: 'id'
            },
            organizationName: {
                allowNull: false,
                type: DataTypes.STRING,
                field: 'organization_name'
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'created_at'
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'updated_at'
            }
        });

        await queryInterface.createTable('comment', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
                field: 'id'
            },
            comment: {
                allowNull: false,
                type: DataTypes.STRING,
                field: 'comment'
            },
            organizationId: {
                allowNull: false,
                type: DataTypes.STRING,
                field: 'organization_id'
            },
            isDeleted: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                field: 'is_deleted'
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'created_at'
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'updated_at'
            }
        });

        await queryInterface.createTable('member', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
                field: 'id'
            },
            login: {
                allowNull: false,
                type: DataTypes.STRING,
                field: 'login'
            },
            avatar_url:{
                allowNull: false,
                type: DataTypes.STRING,
                field: 'avatar_url'
            },
            followers_url: {
                allowNull: false,
                type: DataTypes.STRING,
                field: 'followers_url'
            },
            following_url: {
                allowNull: false,
                type: DataTypes.STRING,
                field: 'following_url'
            },
            followers: {
                allowNull: false,
                type: DataTypes.BIGINT,
                field: 'followers'
            },
            following: {
                allowNull: false,
                type: DataTypes.BIGINT,
                field: 'following'
            },
            organizationId: {
                allowNull: false,
                type: DataTypes.STRING,
                field: 'organization_id'
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'created_at'
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'updated_at'
            }
        });
    }

    async function seedSomeOrganizations() {
        await organizationModel.create({id: 'xendit', organizationName: 'Xendit'})
        await organizationModel.create({id: 'google', organizationName: 'Google'})
        await organizationModel.create({id: 'microsoft', organizationName: 'Microsoft'})
        await organizationModel.create({id: 'apple', organizationName: 'Apple'})
        await organizationModel.create({id: 'lestari', organizationName: 'Lestari'})
    }

    async function seedSomeComments() {
        const isDeleted = false;
        const newComment = {
            comment: "Looking to hire SE Asia's top dev talent!",
            isDeleted
        }
        const anotherComment = {
            comment: "Looking to hire SE Asia's top dev talent! (2)",
            isDeleted
        }
        const xendit = await organizationModel.findOne({where: {id: 'xendit'}});
        await xendit.createComment(newComment);
        await xendit.createComment(anotherComment);
    }

    async function seedSomeMembers() {
        await memberModel.create({
            login:'acetdecastro',
            avatarUrl:'https://avatars.githubusercontent.com/u/13687580?v=4',
            followersUrl:'sample',
            followingUrl:'anothersample',
            followers:3,
            following:8,
            organizationId:'xendit'
        });

        await memberModel.create({
            login:'bxcodec',
            avatarUrl:'https://avatars.githubusercontent.com/u/11002383?v=4',
            followersUrl:'sample',
            followingUrl:'anothersample',
            followers:583,
            following:54,
            organizationId:'xendit'
        });

        await memberModel.create({
            login:'mkamadeus',
            avatarUrl:'https://avatars.githubusercontent.com/u/40513202?v=4',
            followersUrl:'sample',
            followingUrl:'anothersample',
            followers:110,
            following:143,
            organizationId:'xendit'
        });

        await memberModel.create({
            login:'mychaelgo',
            avatarUrl:'https://avatars.githubusercontent.com/u/4651658?v=4',
            followersUrl:'sample',
            followingUrl:'anothersample',
            followers:80,
            following:26,
            organizationId:'xendit'
        });

        await memberModel.create({
            login:'wildan3105',
            avatarUrl:'https://avatars.githubusercontent.com/u/7030099?v=4',
            followersUrl:'sample',
            followingUrl:'anothersample',
            followers:23,
            following:14,
            organizationId:'xendit'
        });
    }

    async function truncateTables() {
        await organizationModel.destroy({truncate: true, cascade:true});
        await commentModel.destroy({truncate: true, cascade:true});
        await memberModel.destroy({truncate: true, cascade:true});
    }

    describe('## Model', () => {
        beforeEach(async () => {
            await seedSomeOrganizations();
            await seedSomeComments();
            await seedSomeMembers();
        })
        afterEach(async () => {
            await truncateTables();
        })

        describe('### Organization', () => {
            it('should return list of organizations when atleast one record is found', async () => {
                const actualResult = await organizationModel.findAll();

                expect(actualResult.length).toEqual(5);
            });

            it('should return xendit organization when argument passed is xendit', async () => {
                const actualResult = await organizationModel.getOrganizationById('xendit');

                expect(actualResult).not.toBeNull();
                expect(actualResult).not.toBeUndefined();
                expect(actualResult.id).toEqual('xendit');
                expect(actualResult.id).toEqual('xendit');
                expect(actualResult.organizationName).toEqual('Xendit');
            });
        })

        describe('### Comment', () => {
            it('should update all records\' field isDeleted to true', async () => {
                const xenditId = {id: 'xendit'};

                const actualResult = await commentModel.updateAll(xenditId);
                const secondActualResult = await commentModel.getAllVisibleCommentsByOrganization(xenditId);

                expect(actualResult).toEqual([2]);
                expect(secondActualResult).toEqual([]);
            });
            it('should get all comments for xendit', async () => {
                const xenditId = {id: 'xendit'};

                const actualResult = await commentModel.getAllVisibleCommentsByOrganization(xenditId);

                expect(actualResult.length).toEqual(2);
            });
        })

        describe('### Member', () => {
            it('should return list of members from xendit and order by highest follower', async () => {
                const xenditId = {id: 'xendit'};

                const actualResult = await memberModel.getMembersOfOrganizationAndSortByHighestFollower(xenditId);

                expect(actualResult.length).toEqual(5);
                expect(actualResult).not.toBeNull();
                expect(actualResult).not.toBeUndefined();
                expect(actualResult.length).toEqual(5);
                expect(actualResult[0].login).toEqual('bxcodec');
                expect(actualResult[0].followers).toEqual(583);
            });

            it('should return empty list of member for abcdef organization', async () => {
                const org = {id: 'abcdef'}

                const actualResult = await memberModel.getMembersOfOrganizationAndSortByHighestFollower(org);

                expect(actualResult).toEqual([]);
                expect(actualResult.length).toEqual(0);
            });
        })
    });

    describe('## Controller', () => {
        beforeEach(async () => {
            await seedSomeOrganizations();
            await seedSomeMembers();
        })
        afterEach(async () => {
            await truncateTables();
        })

        describe('/comments', () => {
            it('#GET it should return 404 Organization not found! when organization is not registered', async () => {
                const response = await request(app)
                    .get('/orgs/abcdef/comments')
                    .expect(404);

                const {body} = response;

                expect(response).not.toBeNull();
                expect(response).not.toBeUndefined();
                expect(body.message).toEqual("Organization not found!");
            });

            it('#GET it should return all comments for Xendit', async () => {
                await seedSomeComments();

                const response = await request(app)
                    .get('/orgs/xendit/comments')
                    .expect(200);

                const {body} = response;

                expect(response).not.toBeNull();
                expect(response).not.toBeUndefined();
                expect(body.length).toEqual(2);
            });

            it('#GET it should return empty comments for Google', async () => {
                await seedSomeComments();

                const response = await request(app)
                    .get('/orgs/google/comments')
                    .expect(200);

                const {body} = response;

                expect(response).not.toBeNull();
                expect(response).not.toBeUndefined();
                expect(body.length).toEqual(0);
            });

            it('#POST it should return 404 when organization doesn\'t exist', async () => {
                const payload = {comment: 'Nice one!'};
                const response = await request(app).post('/orgs/abcdef/comments')
                    .send(payload)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .expect(404);

                const {body} = response;

                expect(response).not.toBeNull();
                expect(response).not.toBeUndefined();
                expect(body.message).toEqual("Organization not found!");
            });

            it('#POST it should return 201 and posted comments when Organization is exist', async () => {
                const payload = {comment: 'Nice one!'};
                const response = await request(app).post('/orgs/xendit/comments')
                    .send(payload)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .expect(201);

                const {body} = response;

                expect(response).not.toBeNull();
                expect(response).not.toBeUndefined();
                expect(body.comment).toContain(payload.comment);
                expect(body.isDeleted).toBeFalsy();
            });
        })

        it('#DELETE it should delete all comments if organization is found', async () => {
            await seedSomeComments();

            const before = await request(app).get('/orgs/xendit/comments')
                .expect(200);
            const response = await request(app).delete('/orgs/xendit/comments')
                .expect(204);
            const after = await request(app).get('/orgs/xendit/comments')
                .expect(200);

            const {body:bodyBefore} = before;
            const {body:bodyDelete} = response;
            const {body:bodyAfter} = after;

            expect(bodyBefore).not.toBeNull();
            expect(bodyBefore).not.toBeUndefined();
            expect(bodyBefore.length).toEqual(2);
            expect(bodyDelete).toEqual({});
            expect(bodyAfter).not.toBeNull();
            expect(bodyAfter).not.toBeUndefined();
            expect(bodyAfter.length).toEqual(0);
        });

        it('#GET it should return 404 and message Unknown Service!', async () => {
            const response = await request(app).get('/orgs/anything').expect(404);

            const {body} = response;

            expect(body.message).toEqual('Unknown Service!');
        });

        it('#GET it should return list of members from xendit', async () => {
            const response = await request(app).get('/orgs/xendit/members')
                .expect(200);

            const {body} = response;

            expect(body).not.toBeNull();
            expect(body).not.toBeUndefined();
            expect(body.length).toEqual(5);
            expect(body[0].login).toEqual('bxcodec');
            expect(body[0].followers).toEqual(583);
        });

        it('#GET it should return empty list of member from lestari', async () => {
            const response = await request(app).get('/orgs/lestari/members')
                .expect(200);

            const {body} = response;

            expect(body).not.toBeNull();
            expect(body).not.toBeUndefined();
            expect(body.length).toEqual(0);
        });

        it('#GET it should return empty list of member from abcdef', async () => {
            const response = await request(app).get('/orgs/abcdef/members')
                .expect(404);

            const {body} = response;

            expect(body).not.toBeNull();
            expect(body).not.toBeUndefined();
            expect(body.message).toEqual("Organization not found!");
        });
    });
});
