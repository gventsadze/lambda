import { ValidationInterface } from './interfaces/validation.interface';

export class ValidationHandler {
    public execute(status: boolean, message: string): ValidationInterface {
        return { status, message };
    }
}
