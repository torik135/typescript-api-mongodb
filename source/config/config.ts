import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    // poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

// DB
const MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1';
const MONGO_PORT = process.env.MONGO_PORT || 27017;

const MONGO = {
    host: MONGO_HOST,
    port: MONGO_PORT,
    options: MONGO_OPTIONS,
    url: `mongodb://${MONGO_HOST}:${MONGO_PORT}`
};

// SERVER
const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;

// TOKEN
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'secretissuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'secretstring';

const SERVER = {
    host: SERVER_HOST,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    mongo: MONGO,
    server: SERVER
};

export default config;
