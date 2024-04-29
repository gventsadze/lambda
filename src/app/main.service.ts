import { APIGatewayProxyResult } from 'aws-lambda';
import mongoose from 'mongoose';

import { IsValidUser } from './validation/is-valid-user';
import { ValidationInterface } from './common/interfaces/validation.interface';
import { HttpStatus } from './common/http-status.enum';

export class MainService {
    constructor(
        private payload: Record<any, any>,
        private queryParams: Record<any, any>,
        private httpMethod: string,
    ) {}

    public async execute(): Promise<APIGatewayProxyResult> {
        const realPayload: ValidationInterface = new IsValidUser().checkAndTransform(this.payload);

        return {
            statusCode: HttpStatus.OK,
            body: JSON.stringify({
                realPayload,
                app_name: process.env.APP_NAME,
                requestBody: this.payload,
                queryParams: this.queryParams,
                httpMethod: this.httpMethod,
                class_name: this.constructor.name,
                message: 'AWS Lambda v3 AFTER ENV function is executed successfully! ' + process.env.APP_NAME,
                timestamp: new Date().toISOString(),
            }),
        };
    }
}
