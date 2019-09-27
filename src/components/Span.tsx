import React from 'react';
import PropTypes from 'prop-types';
import { FontWeightProperty } from 'csstype';

import EmailPropTypes from '../prop-types';
import includeDataProps from '../include-data-props';

export interface SpanProps {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: FontWeightProperty;
  lineHeight?: number;
  color?: string;
  style?: React.CSSProperties;
  children: React.ReactNode | Array<React.ReactNode>;

  [k: string]: any;
}

export function Span(props: SpanProps) {
  const lineHeight = props.lineHeight !== undefined ? props.lineHeight : props.fontSize;
  return (
    <span
      {...includeDataProps(props)}
      style={{
        fontFamily: props.fontFamily,
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
        lineHeight: `${lineHeight}px`,
        color: props.color,
        ...props.style,
      }}
    >
      {props.children}
    </span>
  );
}

Span.propTypes = {
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
  lineHeight: PropTypes.number,
  color: PropTypes.string,
  style: EmailPropTypes.style,
  children: PropTypes.node,
};

Span.defaultProps = {
  fontFamily: 'sans-serif',
  fontSize: 14,
  fontWeight: undefined,
  lineHeight: undefined,
  color: '#000',
  style: undefined,
  children: undefined,
};
