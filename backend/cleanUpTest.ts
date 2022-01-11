beforeAll(async () => {
	const { getDb } = require('@shared');
	if (!getDb) return;
	if (!getDb()?.migrate) return;

	await getDb().migrate.latest();
});

afterAll(async () => {
	const { releaseConnection, getDb } = require('@shared');
	if (!releaseConnection || !getDb) return;
	await releaseConnection();
});

export {};
