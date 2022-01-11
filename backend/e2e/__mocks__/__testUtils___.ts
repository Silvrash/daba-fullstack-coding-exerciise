import express from 'express';
import { createTestClient } from 'apollo-server-integration-testing';
import { createServer } from 'src/app';

export function testAppServer() {
	const app = express();
	const apolloServer = createServer(app);
	return createTestClient({ apolloServer });
}
