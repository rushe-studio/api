import dayjs from 'dayjs';
import { Constants } from '@/config/constants';
import { EnvironmentEnum } from '@/application/enums/EnvironmentEnum';

enum LogTypeEnum {
    DEBUG = 'DEBUG',
    ERROR = 'ERROR',
    FATAL = 'FATAL',
    INFO = 'INFO'
}

interface LogStyles {
    background: Record<string, string>;
    bold: string;
    color: Record<string, string>;
    hide: string;
    reset: string;
    show: string;
}

const styles: LogStyles = {
    background: {
        blue: '\x1b[46m',
        grey: '\x1b[40m',
        purple: '\x1b[45m',
        red: '\x1b[41m',
        yellow: '\x1b[43m'
    },
    bold: '\x1b[1m',
    color: {
        blue: '\x1b[36m',
        purple: '\x1b[35m',
        red: '\x1b[31m',
        yellow: '\x1b[33m'
    },
    hide: '\x1b[8m',
    reset: '\x1b[0m',
    show: '\x1b[28m'
};

export class Logger {
    private static blocked: boolean;
    private static logsNumber: number = 0;

    public static block(): void {
        this.blocked = true;
    }

    private static formatMessage(message: number | object | string, type: LogTypeEnum, color: string, contextName: string = '?'): void {
        if(!Logger.blocked) {
            this.logsNumber++;

            const formatedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
            console.log(`${styles.bold}${styles.background[color] ?? ''} [${this.logsNumber}] ${type}${styles.hide}${'*'.repeat(7 - type.length)}${styles.background.grey ?? ''}${styles.show} ${formatedDate} ${styles.background[color] ?? ''} [${contextName}] ${styles.reset} ${styles.bold}${styles.color[color] ?? ''}`, message instanceof Object ? `${JSON.stringify(message, null, 4)}` : message, `${styles.reset}\n`);
        }
    }

    public static debug(message: number | object | string, contextName?: string): void {
        if(Constants.ENVIRONMENT === EnvironmentEnum.DEVELOPMENT)
            this.formatMessage(message, LogTypeEnum.DEBUG, 'purple', contextName);
    }

    public static error(message: number | object | string, contextName?: string): void {
        this.formatMessage(message, LogTypeEnum.ERROR, 'red', contextName);
    }

    public static fatal(message: number | object | string, contextName?: string): void {
        this.formatMessage(message, LogTypeEnum.FATAL, 'yellow', contextName);
    }

    public static info(message: number | object | string, contextName?: string): void {
        this.formatMessage(message, LogTypeEnum.INFO, 'blue', contextName);
    }
}