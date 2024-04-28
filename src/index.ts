import { Context, Handler } from 'aws-lambda';

import { logger } from './modules/logger';

export const handler: Handler = async (event: any, context: Context) => {
    try {
        console.log('AWS Lambda function is executing...');

        logger();

        return {
            statusCode: 200,
            body: JSON.stringify({
                app_name: process.env.APP_NAME,
                message: 'AWS Lambda AFTER ENV function is executed successfully! ' + process.env.APP_NAME,
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
                event,
                context,
                timestamp: new Date().toISOString(),
            }),
        };
    }
};
