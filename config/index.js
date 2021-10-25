import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

export default {
    applicationPort: process.env.APPLICATION_PORT,
    applicationName: 'Organizations-API',
    db: {
        name: 'organizations',
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        port: process.env.POSTGRES_PORT
    }
};
