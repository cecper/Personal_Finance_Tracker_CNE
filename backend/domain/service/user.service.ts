import {User} from '../model/user'
import {UserRepository} from '../data-access/user.repository'


export class UserServices {

    private async getRepo() {
        return UserRepository.getInstance();
    }

    //create user
    async createUser(user: User) {
        const repo = await this.getRepo();

        return repo.createUser(user);
    }

    // user validate password
    async validatePassword(user: User): Promise<boolean> {
        const repo = await this.getRepo();
        return repo.validatePassword(user);
    }

    //get a user by email
    async getUserByEmail(email: string): Promise<User> {
        const repo = await this.getRepo();
        return repo.getUserByEmail(email);
    }


}

export const userServices = new UserServices();