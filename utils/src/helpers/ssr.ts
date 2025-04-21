// noinspection JSUnusedGlobalSymbols

/**
 * Determines if the code is running in a browser environment
 * Checks if the 'window' object exists, which is only available in browser contexts
 */
export const isBrowser: boolean = typeof window !== 'undefined';

/**
 * Determines if the code is running in a server environment
 * The inverse of isBrowser - if not in browser, must be on server
 */
export const isServer = !isBrowser;
