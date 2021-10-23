import {DataTypes, Model} from "sequelize";

class Organization extends Model {
    static init(sequelize) {
        return super.init({
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
        }, {
            sequelize,
            modelName: 'organization',
            tableName: 'organization'
        })
    }

    static getOrganizationById(organizationId){
        return Organization.findOne({
            where: {
                id: organizationId
            }
        });
    }
}

export default Organization;
