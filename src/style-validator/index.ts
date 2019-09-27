import { LoggerLike, BunyanLike, bunyanize } from '@eropple/bunyan-wrapper';
import { findUp } from '@eropple/find-up';

// tslint:disable-next-line: no-require-imports no-var-requires
const supportMatrix = require(findUp(__dirname, 'support-matrix.json')!);

const capsRe = /[A-Z]/g;

export interface StyleValidatorOptions {
  strict: boolean;
  platforms: Array<string>;
}

export class StyleValidator {
  readonly logger: BunyanLike;
  readonly options: StyleValidatorOptions;

  constructor(logger: LoggerLike, options: Partial<StyleValidatorOptions> = {}) {
    this.logger = bunyanize(logger).child({ component: 'RxMailer', subcomponent: 'StyleValidator' });
    this.options = {
      strict: true,
      platforms: [
        'gmail',
        'gmail-android',
        'apple-mail',
        'apple-ios',
        'yahoo-mail',
        'outlook',
        'outlook-legacy',
        'outlook-web',
      ],
      ...options,
    };
  }

  validate(style: { [key: string]: any }, componentName: string): Error | null {
    // eslint-disable-next-line no-restricted-syntax
    for (const propNameCamelCase of Object.keys(style)) {
      const propName = propNameCamelCase.replace(capsRe, match => `-${match[0].toLowerCase()}`);

      const supportInfo = supportMatrix[propName];

      if (!supportInfo) {
        if (this.options.strict) {
          return new Error(`Unknown style property \`${propName}\` supplied to \`${componentName}\`.`);
        }
      } else {
        const unsupported: Array<string> = [];
        const messages = new Map();
        this.options.platforms.forEach((platform) => {
          if (typeof supportInfo[platform] === 'string') {
            const msg = supportInfo[platform];
            if (!messages.has(msg)) {
              messages.set(msg, []);
            }
            messages.get(msg).push(platform);
          } else if (supportInfo[platform] === false) {
            unsupported.push(platform);
          }
        });

        for (const [msg, platforms] of messages) {
          this.logger.warn(
            `Warning: Style property '${propName}' supplied ` +
            `to '${componentName}', in ${platforms.join(', ')}: ${msg.toLowerCase()}`,
          );
        }

        if (unsupported.length) {
          const errorMessage =
            `Style property \`${propName}\` supplied to \`${componentName}\` ` +
            `unsupported in: ${unsupported.join(', ')}.`;

          if (this.options.strict) {
            this.logger.error(errorMessage);
            return new Error(errorMessage);
          } else {
            this.logger.warn(errorMessage);
          }
        }
      }
    }
    return null;
  }
}
