import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

export default {
    applicationPort: process.env.APPLICATION_PORT,
    applicationName: 'Organizations-API',
    db: {
        name: 'organizations',
        username: process.env.POSTGRESQL_USERNAME,
        password: process.env.POSTGRESQL_PASSWORD,
        host: process.env.POSTGRESQL_HOSTNAME,
        dialect: 'postgres',
        port: process.env.POSTGRESQL_PORT
    }
};
