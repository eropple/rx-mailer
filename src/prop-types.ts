import PropTypes from 'prop-types';
import { StyleValidator, StyleValidatorOptions } from './style-validator';
import { LoggerLike } from '@eropple/bunyan-wrapper/dist';

export let styleValidator = new StyleValidator(console);

export function setStyleValidatorOptions(options: StyleValidatorOptions) {
  styleValidator = new StyleValidator(styleValidator.logger, options);
}

export function setStyleValidatorLogger(logger: LoggerLike) {
  styleValidator = new StyleValidator(logger, styleValidator.options);
}

export default {
  style(
    props: { [key: string]: any },
    propName: string,
    componentName: string,
    location: string,
  ) {
    if (props[propName] == null) {
      return null;
    }

    const objPropType = {
      [propName]: PropTypes.object,
    };

    try {
      PropTypes.checkPropTypes(objPropType, props, location, componentName);
    } catch (err) {
      return err;
    }

    return styleValidator.validate(props[propName], componentName);
  },
};
