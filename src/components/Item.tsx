import React from 'react';
import PropTypes from 'prop-types';

import EmailPropTypes from '../prop-types';
import includeDataProps from '../include-data-props';

export interface ItemProps {
  className?: string;
  bgcolor?: string;
  align?: 'left' | 'center' | 'right';
  valign?: 'top' | 'middle' | 'bottom';
  style?: React.CSSProperties;
  children: React.ReactNode | Array<React.ReactNode>;

  [k: string]: any;
}

export function Item(props: ItemProps) {
  return (
    <tr>
      <td
        {...includeDataProps(props)}
        className={props.className}
        align={props.align}
        valign={props.valign}
        style={props.style}

        // React doesn't support this because it was removed from the spec, you know,
        // 16 years ago. But HTML emails are a disaster, so...
        {...{ bgcolor: props.bgcolor }}
      >
        {props.children}
      </td>
    </tr>
  );
}

Item.propTypes = {
  className: PropTypes.string,
  bgcolor: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  valign: PropTypes.oneOf(['top', 'middle', 'bottom']),
  style: EmailPropTypes.style,
  children: PropTypes.node,
};

Item.defaultProps = {
  className: undefined,
  bgcolor: undefined,
  align: undefined,
  valign: undefined,
  style: undefined,
  children: undefined,
};
