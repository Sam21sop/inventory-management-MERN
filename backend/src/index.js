import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import errorHandler from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';


// instance of server using express
const server = express();


// Parses incoming requests with JSON payloads.
// This middleware is based on the body-parser module under the hood.
server.use(express.json());

/** 
 * Parses incoming requests with URL-encoded payloads.
 * This is used to parse `application/x-www-form-urlencoded` data, which is often used when submitting forms.
 * The `extended: false` option means that the querystring library will be used to parse the URL-encoded data, resulting in a simpler parsing process. 
 * If `extended: true`, the qs library would be used, which allows for more complex parsing.
 */
server.use(express.urlencoded({ extended: true }));

/** 
 * Parses cookies attached to the client request object.
 * This middleware is useful for handling cookies sent by the client and making them available on the `req.cookies` object.
 */
server.use(cookieParser());

/** 
 * Parses incoming requests with JSON payloads.
 * This middleware is from the body-parser module, which provides a richer API for parsing request bodies compared to express.json().
 * Including this middleware in addition to express.json() may be redundant unless specific configurations or behaviors provided by body-parser are required.
 */
server.use(bodyParser.json());

/** 
 * Enables Cross-Origin Resource Sharing (CORS) with specific configurations.
 * CORS is a security feature implemented by browsers to control how web pages can request resources
 * from a different domain than the one that served the web page.
 * The `origin` option specifies an array of allowed origins that can access the resources.
 * The `credentials: true` option allows cookies to be included in CORS requests.
 * This setup is essential for allowing client-side applications hosted on different ports or domains
 * (like frontend apps) to interact with the server.
 */
server.use(
    cors({
        origin: ['http://localhost:3030', 'http://localhost:8080'],
        credentials: true
    })
);

/** 
 * Serves static files from the 'uploads' directory.
 * This middleware allows the server to serve files from a specific directory when requested.
 * The path is resolved to the 'src/uploads' directory relative to the project's root directory.
 * For example, a file stored at `src/uploads/image.png` can be accessed via `http://yourserver/uploads/image.png`.
 */
server.use('/uploads', express.static(path.resolve('src', 'uploads')));


// application routes 
server.get('/', (req, res) => {
    res.send("Hello developer !");
});

server.use('/api/v1/user', userRoutes);
server.use('/api/v1/product', productRoutes)


// Register the error-handling middleware in the Express application.
// This should be done after all other middleware and routes, so it can catch errors from them.
server.use(errorHandler);

export default server;