import { User } from '../model/user'
import { UserRepository } from '../data-access/user.repository'


export class UserServices {

    private async getRepo() {
        return UserRepository.getInstance();
    }

    //create user
    async createUser(user: User) {
        const repo = await this.getRepo();


        //catch error if user already exists
        try {
            const result = await repo.createUser(user);
        } catch (error) {
            throw error;
        }



        return user;
    }

    // user validate password
    async validatePassword(username: string, password: string): Promise<boolean> {
        const repo = await this.getRepo();
        return repo.validatePassword(username, password);
    }

    //get a user by email
    async getUserByEmail(email: string): Promise<User> {
        const repo = await this.getRepo();
        return repo.getUserByEmail(email);
    }

    async getUserId(username: string): Promise<string> {
        const repo = await this.getRepo();
        return repo.getUserId(username);
    }



}

export const userServices = new UserServices();