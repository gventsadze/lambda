export const stringToNumber = (value: string): number => Number(value);
export const isString = (value: any): value is string => typeof value === 'string';
export const isNumber = (value: any): boolean => {
    if (!value) return false;

    return !isNaN(Number(value));
};
export const isBoolean = (value: any): value is boolean => typeof value === 'boolean';
export const isArray = (value: any): value is any[] => Array.isArray(value);
export const isObject = (value: any): value is Record<any, any> => typeof value === 'object' && !isArray(value);
export const isEmail = (email: string): boolean => {
    if (!email) return false;

    // Regular expression pattern to match email format
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
};
