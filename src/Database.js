import { Sequelize } from 'sequelize';

require('pg').defaults.parseInt8 = true;

let sequelize = null;

const connect = (options) => {
    const {
        name,
        username,
        password,
        ...otherConfig
    } = options;

    if (!sequelize) {
        sequelize = new Sequelize(name, username, password, otherConfig);
    }

    return sequelize;
};

const disconnect = () => sequelize.close();

module.exports = {
    connect,
    disconnect
};
