import type { EnvironmentEnum } from '@/application/enums/EnvironmentEnum';

export const Constants = {
    ENVIRONMENT: process.env.ENVIRONMENT as EnvironmentEnum,
    API_PORT: process.env.API_PORT as unknown as number
};
