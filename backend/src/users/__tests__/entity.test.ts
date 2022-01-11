import buildUserEntity from '../entity';

describe('User Entity', () => {
	const deps = {
		makeId: jest.fn(),
		toDateString: jest.fn(),
		makeToken: jest.fn(),
		uploadImage: jest.fn(),
		hashValue: jest.fn().mockReturnValue('hashedValue'),
		verifyHash: jest.fn(),
		generateCode: jest.fn(),
		baseError: jest.fn(),
		validateRequired: jest.fn(),
	};

	const factory = buildUserEntity(deps);

	afterEach(() => {
		deps.makeId.mockReset();
		deps.toDateString.mockReset();
		deps.makeToken.mockReset();
		deps.uploadImage.mockReset();
		deps.hashValue.mockReset();
		deps.verifyHash.mockReset();
		deps.generateCode.mockReset();
		deps.baseError.mockReset();
	});

	it('should generate id', async () => {
		deps.makeId.mockReturnValue('someid');
		const user = await factory({ email: 'someone@gmail.com', password: 'passkey' });
		expect(deps.makeId).toBeCalledTimes(1);
		expect(user.getId()).toBe('someid');
		expect(user.getUser().id).toBe('someid');
	});

	it('should not generate id', async () => {
		const user = await factory({ id: 'myid', email: 'someone@gmail.com', password: 'passkey' });
		expect(deps.makeId).toBeCalledTimes(0);
		expect(user.getId()).toBe('myid');
		expect(user.getUser().id).toBe('myid');
	});

	it('should upload image', async () => {
		deps.uploadImage.mockReturnValue('image');
		const user = await factory({ email: 'someone@gmail.com', password: 'passkey' });
		expect(deps.uploadImage).toBeCalledTimes(1);
		expect(user.getUser().photo).toBe('image');
	});

	it('should use provided email', async () => {
		const user = await factory({ email: 'someone@gmail.com', password: 'passkey' });
		expect(user.getEmail()).toBe('someone@gmail.com');
		expect(user.getUser().email).toBe('someone@gmail.com');
	});

	it('should use provided phone number', async () => {
		const user = await factory({ phone: '022xxx' });
		expect(user.getPhone()).toBe('022xxx');
	});

	it('should make token', async () => {
		const user = await factory({ id: 'the id' });
		user.getToken();
		expect(deps.makeToken).toBeCalledTimes(1);
		expect(deps.makeToken).toBeCalledWith('the id');
	});

	it('should have name', async () => {
		const user = await factory({ name: 'James Prat' });
		expect(user.getName()).toBe(`James Prat`);
	});

	it('should hash password', async () => {
		deps.hashValue.mockReturnValue('hashedpasskey');
		const user = await factory({ email: 'someone@gmail.com', password: 'passkey' });
		user.hashPassword();

		expect(user.getUser().password).toBe('hashedpasskey');
		expect(user.getPassword()).toBe('hashedpasskey');
		expect(deps.hashValue).toBeCalledTimes(1);
		expect(deps.hashValue).toBeCalledWith('passkey');
	});

	it('should verify password', async () => {
		const user = await factory({ email: 'someone@gmail.com', password: 'passkey' });
		user.verifyPassword('key');
		expect(deps.verifyHash).toBeCalledTimes(1);
		expect(deps.verifyHash).toBeCalledWith('key', 'passkey');
	});

	it('update last signed in', async () => {
		deps.toDateString.mockReturnValue('now');

		const user = await factory({ email: 'someone@gmail.com', password: 'passkey' });
		user.updateLastSignedIn();
		expect(deps.toDateString).toBeCalledTimes(1);
		expect(user.getLastSignedIn()).toBe('now');
		expect(user.getUser().lastSignInDate).toBe('now');
	});

});
