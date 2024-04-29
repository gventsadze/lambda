import { ValidationInterface } from './interfaces/validation.interface';

export class ValidationResponse {
    public execute(status: boolean, message: string): ValidationInterface {
        return { status, message };
    }
}
