import { APIGatewayProxyHandler, Context } from 'aws-lambda';

import { MainService } from './app/main.service';

export const handler: APIGatewayProxyHandler = async (event: any, context: Context) => {
    try {
        // Access the payload data (assuming it's JSON)
        const requestBody: Record<string, any> = JSON.parse(event.body || '{}');

        // Access specific query parameters
        const queryParams: Record<string, any> = event.queryStringParameters || {};

        // Detect HTTP method
        const httpMethod: string = event.httpMethod;

        const mainService: MainService = new MainService(requestBody, queryParams, httpMethod);

        return await mainService.execute();
    } catch (error) {
        console.error('Error in handler:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal Server Error',
                event,
                context,
                timestamp: new Date().toISOString(),
            }),
        };
    }
};
