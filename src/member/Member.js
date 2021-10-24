import {DataTypes, Model} from "sequelize";

class Member extends Model {
    static init(sequelize){
        return super.init({
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
            }
        }, {
            sequelize,
            modelName: 'member',
            tableName: 'member'
        })
    }
}

export default Member;
