import {DataTypes, Model} from "sequelize";

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

    static async createComment(commentDetail, organizationId) {
        const {comment} = commentDetail;
        const isDeleted = false;
        return await Comment.create({
            comment,
            organizationId,
            isDeleted
        });
    }
}

export default Comment;