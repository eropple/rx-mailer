import React from 'react';
import PropTypes from 'prop-types';

import EmailPropTypes from '../prop-types';
import includeDataProps from '../include-data-props';

export interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  style: React.CSSProperties;

  [k: string]: any;
}

export default function Image(props: ImageProps) {
  return (
    <img
      {...includeDataProps(props)}
      alt={props.alt}
      src={props.src}
      width={props.width}
      height={props.height}
      style={{
        display: 'block',
        outline: 'none',
        border: 'none',
        textDecoration: 'none',
        ...props.style,
      }}
    />
  );
}

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: EmailPropTypes.style,
};

Image.defaultProps = {
  style: undefined,
};
