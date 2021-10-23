import {DataTypes, Model} from "sequelize";
import Organization from "../organization/Organization";

class Comment extends Model {
    static init(sequelize) {
        return super.init({
            commentId: {
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
        }, {
            sequelize,
            modelName: 'comment',
            tableName: 'comment'
        })
    }

    static associate(models) {
        const { Comment: CommentModel, Organization: OrganizationModel} = models;
        CommentModel.belongsTo(OrganizationModel, { targetKey: 'id' });
    }

    static async updateAll(organization) {
        const isDeleted = true;
        return await Comment.update(
            {isDeleted},
            {
                where: {
                    organizationId: organization.id,
                    isDeleted: false
                }
            }
        )
    }

    static async getAllVisibleCommentsByOrganization(organization) {
        return await Comment.findAll({
            where: {
                organizationId: organization.id,
                isDeleted: false
            }
        })
    }
}

export default Comment;
