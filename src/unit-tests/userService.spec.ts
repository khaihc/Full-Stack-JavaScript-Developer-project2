import { UserService } from '../services/userService';
import * as dbService from '../services/dbService';
import { User } from '../types/apiResponse';

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();

        spyOn(dbService, 'executeQuery').and.callFake((callback: (connection: any) => Promise<any>) => {
            const mockConnection = {
                query: jasmine.createSpy().and.returnValue(Promise.resolve({ rows: [] }))
            };
            return callback(mockConnection);
        });
    });

    describe('fetchAllUsers', () => {
        it('should fetch all users', async () => {
            const mockUsers: User[] = [
                { id: 1, user_name: 'khai.hoang 1', first_name: 'hoang 1', last_name: 'khai 1', password: 'khai.hoangNew1' }
            ];

            (dbService.executeQuery as jasmine.Spy).and.callFake((callback) => {
                const mockConnection = {
                    query: jasmine.createSpy().and.returnValue(Promise.resolve({ rows: mockUsers }))
                };
                return callback(mockConnection);
            });

            const result = await userService.fetchAllUsers();
            console.log("should fetch all users: ", result);
            expect(result).toEqual(mockUsers);
        });

        it('should throw an error if no users are found', async () => {
            await expectAsync(userService.fetchAllUsers()).toBeRejectedWithError('No users found in the database.');
        });
    });

    describe('fetchUserInformation', () => {
        it('should return user information for a valid userId', async () => {
            const mockUser: any = { id: 1, first_name: 'admin', last_name: 'admin', user_name: 'admin', password: 'admin123' };
            (dbService.executeQuery as jasmine.Spy).and.callFake((callback) => {
                return callback({
                    query: async () => ({ rows: [mockUser] })
                });
            });
        
            const result = await userService.fetchUserInformation(1);
            console.log("should return user information for a valid userId:", result.user);
            expect(result.user).toEqual(mockUser);
        });

        it('should throw an error if user not found', async () => {
            (dbService.executeQuery as jasmine.Spy).and.callFake((callback) => {
                const mockConnection = {
                    query: jasmine.createSpy().and.returnValue(Promise.resolve({ rows: [] }))
                };
                return callback(mockConnection);
            });

            await expectAsync(userService.fetchUserInformation(999)).toBeRejectedWithError('User not found.');
        });
    });
});