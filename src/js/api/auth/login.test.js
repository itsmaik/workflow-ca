import { login } from './login';
import * as storage from '../../storage/index';
import { headers } from '../headers';

// Setting up environment variable
beforeAll(() => {
  process.env.API_PATH = 'https://nf-api.onrender.com/api/v1';
});

// Mocking the external modules
jest.mock('../../storage/index', () => ({
  save: jest.fn(),
  load: jest.fn(() => 'mocked-token'),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ accessToken: 'mocked-token', userId: 1 }),
  }),
);

describe('login function', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  it('stores a token when provided with valid credentials', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const result = await login(email, password);

    // Construct the expected URL from the environment variable
    const expectedUrl = `${process.env.API_PATH}/social/auth/login`;

    // Expect fetch to have been called with correct arguments
    expect(fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: headers('application/json'),
    });

    // Expect save to have been called to store the token and profile
    expect(storage.save).toHaveBeenCalledWith('token', 'mocked-token');
    expect(storage.save).toHaveBeenCalledWith('profile', { userId: 1 });

    // Expect the function to return the profile information (without token)
    expect(result).toEqual({ userId: 1 });
  });

  it('throws an error when the response is not ok', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Unauthorized',
      }),
    );

    await expect(login('wrong@example.com', 'wrongpassword')).rejects.toThrow(
      'Unauthorized',
    );
  });
});
