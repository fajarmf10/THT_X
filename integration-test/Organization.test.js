import database from "../src/Database";
import {DataTypes} from "sequelize";
import Comment from "../src/comment/Comment";
import Organization from "../src/organization/Organization";

describe('# Application Test', () => {
    let databaseConnection;
    const applicationConfig = {
        applicationPort: 8012,
        applicationName: 'Organizations-API',
        db: {
            name: 'postgres',
            username: 'postgres',
            password: 'halosemua',
            host: '127.0.0.1',
            dialect: 'postgres',
            port: 5430
        }
    };
    let organizationModel;
    let commentModel;

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
        organizationModel.associate({Organization: organizationModel, Comment: commentModel})
        commentModel.associate({Organization: organizationModel, Comment: commentModel})
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

    describe('## Model', () => {
        beforeEach(async () => {
            await initializeTables();
            await seedSomeOrganizations();
            await seedSomeComments();
        })
        afterEach(async () => {
            await dropTables();
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
    });
});