require('dotenv').config();

const { DatabaseService } = require('../services');

beforeAll(() => DatabaseService.connect());

beforeEach(() => DatabaseService.truncate());

afterAll(() => DatabaseService.disconnect());
