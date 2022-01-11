import path from 'path';

require('dotenv').config({ path: path.resolve(__dirname, './src/.env.test') });

jest.setTimeout(30000);
export {};
