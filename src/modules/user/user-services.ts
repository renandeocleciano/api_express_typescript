const userEntities = require('../../entities/user');

export class UserServices {
    constructor() {
    }

    addUser(user: any) {
        return userEntities.create(user);
    }

    getById(id: string) {
        return userEntities.findOne({ _id : id }).exec();
    }

    getByEmail(email: string) {
        return userEntities.findOne({ email : email }).exec();
    }
}