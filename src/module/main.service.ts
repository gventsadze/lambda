import { APIGatewayProxyResult } from 'aws-lambda';

import { IsValidUser } from './validation/is-valid-user';
import { ValidationInterface } from './common/interfaces/validation.interface';

export class MainService {
    constructor(
        private payload: Record<any, any>,
        private queryParams: Record<any, any>,
        private httpMethod: string,
    ) {}

    public async execute(): Promise<APIGatewayProxyResult> {
        try {
            const realPayload: ValidationInterface = new IsValidUser().checkAndTransform(this.payload);

            return {
                statusCode: 200,
                body: JSON.stringify({
                    realPayload,
                    app_name: process.env.APP_NAME,
                    requestBody: this.payload,
                    queryParams: this.queryParams,
                    httpMethod: this.httpMethod,
                    class_name: this.constructor.name,
                    message: 'AWS Lambda v2 AFTER ENV function is executed successfully! ' + process.env.APP_NAME,
                    timestamp: new Date().toISOString(),
                }),
            };

            // Your Lambda function logic here
        } catch (error) {
            console.error('Error in handler:', error);

            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Internal Server Error',
                    timestamp: new Date().toISOString(),
                }),
            };
        }
    }
}
