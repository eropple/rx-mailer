import React from 'react';
import PropTypes from 'prop-types';

import EmailPropTypes from '../prop-types';

export interface BoxProps {
  cellPadding?: number;
  cellSpacing?: number;
  border?: string;
  bgcolor?: string;
  width?: string;
  height?: string;
  align?: 'left' | 'center' | 'right';
  valign?: 'top' | 'middle' | 'bottom';
  style?: React.CSSProperties;
  children: React.ReactNode | Array<React.ReactNode>;

  [k: string]: any;
}

export function Box({ children, ...props }: BoxProps) {
  return (
    <table {...props}>
      <tbody>
        {children}
      </tbody>
    </table>
  );
}

Box.propTypes = {
  cellPadding: PropTypes.number,
  cellSpacing: PropTypes.number,
  border: PropTypes.string,
  bgcolor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  valign: PropTypes.oneOf(['top', 'middle', 'bottom']),
  style: EmailPropTypes.style,
  children: PropTypes.node,
};

Box.defaultProps = {
  cellPadding: 0,
  cellSpacing: 0,
  border: '0',
  align: 'left',
  valign: 'top',
  bgcolor: undefined,
  width: undefined,
  height: undefined,
  style: undefined,
  children: undefined,
};
