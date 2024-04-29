import { isEmail, isNumber, isString, stringToNumber } from '../common/type.helper';
import { ValidationHandler } from '../common/validation-handler';
import { ValidationInterface } from '../common/interfaces/validation.interface';

export class IsValidUser extends ValidationHandler {
    public checkAndTransform(obj: any): ValidationInterface {
        const validName: boolean = isString(obj.name);
        const validEmail: boolean = isEmail(obj.email);

        obj.age = stringToNumber(obj.age);
        const validAge: boolean = isNumber(obj.age);

        if (!validName) {
            return this.execute(false, 'Name is not a string');
        }

        if (!validEmail) {
            return this.execute(false, 'Email is not a valid email');
        }

        if (!validAge) {
            return this.execute(false, 'Age is not a number');
        }

        return this.execute(true, 'User is valid');
    }
}
