/** enable import aliases  */
require('module-alias/register');

/** setup env  */
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, process.env.NODE_ENV === 'test' ? '.env.test' : '.env') });

import express from 'express';
import http from 'http';
import R from 'ramda';
import { createAsyncServer as createServer } from './app';
import K from './_shared/constants';

const app = express();
const httpServer = http.createServer(app);
const PORT = K.PORT;

createServer(app).then((apolloServer) => {
	apolloServer.applyMiddleware({ app });
	apolloServer.installSubscriptionHandlers(httpServer);
	httpServer.listen(PORT, R.partial<void>(console.log, [`🚀 Server ready at http://localhost:${PORT}`]));
});
