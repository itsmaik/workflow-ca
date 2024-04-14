import { logout } from './logout';
import * as storage from '../../storage/index';

// Mock the storage module
jest.mock('../../storage/index', () => ({
  remove: jest.fn(),
}));

describe('logout function', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    storage.remove.mockClear();
  });

  it('clears the token and profile from storage', () => {
    logout();

    // Check if remove is called correctly
    expect(storage.remove).toHaveBeenCalledTimes(2);
    expect(storage.remove).toHaveBeenCalledWith('token');
    expect(storage.remove).toHaveBeenCalledWith('profile');
  });
});
