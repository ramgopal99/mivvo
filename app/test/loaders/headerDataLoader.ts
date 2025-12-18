import { getHeaderData as getHeaderDataFromConfig } from '../config';

// Re-export functions from the centralized config
export const getHeaderData = getHeaderDataFromConfig;

/**
 * To add header data for a new language:
 * 1. Open app/test/config/config.ts
 * 2. Add new entry to HEADER_DATA_CONFIG object with title and completionPercentage
 * 3. Header data will be automatically available!
 */
