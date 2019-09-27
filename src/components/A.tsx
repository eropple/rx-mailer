import React from 'react';
import PropTypes from 'prop-types';
import { TextDecorationProperty } from 'csstype';

import EmailPropTypes from '../prop-types';
import includeDataProps from '../include-data-props';

export interface AProps {
  href: string;
  download?: string;
  color?: string;
  textDecoration?: TextDecorationProperty;
  style?: React.CSSProperties;
  children?: Array<React.ReactNode>;

  [k: string]: any;
}

export function A(props: AProps) {
  return (
    <a
      {...includeDataProps(props)}
      download={props.download}
      href={props.href}
      target='_blank'
      style={{
        color: props.color,
        textDecoration: props.textDecoration,
        ...props.style,
      }}
    >
      {props.children}
    </a>
  );
}

A.propTypes = {
  href: PropTypes.string.isRequired,
  download: PropTypes.string,
  color: PropTypes.string,
  textDecoration: PropTypes.string,
  style: EmailPropTypes.style,
  children: PropTypes.node,
};

A.defaultProps = {
  textDecoration: 'underline',
  href: undefined,
  download: undefined,
  color: undefined,
  style: undefined,
  children: undefined,
};
