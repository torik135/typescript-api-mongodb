import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logging from './config/logging';
import config from './config/config';
import sampleRoutes from './routes/sample';
import bookRoutes from './routes/book';
import userRoutes from './routes/user';

const NAMESPACE = 'SERVER';
const router = express();

// CONNECT TO DB
mongoose.connect(config.mongo.url, config.mongo.options)
    .then(result => {
        logging.info(NAMESPACE, 'DB Connected!');
    })
    .catch(error => {
        logging.error(NAMESPACE, error.message, error);
    });

// LOGGING INTO REQUEST
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

// PARSE THE REQUEST
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// API RULES
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT GET DELETE POST PATCH');
        return res.status(200).json({});
    }

    next();
});

// ROUTES
router.use('/api/sample', sampleRoutes);
router.use('/api/books', bookRoutes);
router.use('/users', userRoutes);

// ERROR HANDLING
router.use((req, res, next) => {
    const error = new Error('Not Found');

    return res.status(404).json({
        message: error.message
    });
});

// CREATE SERVER
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Server runs on http://${config.server.host}:${config.server.port}`);
});
