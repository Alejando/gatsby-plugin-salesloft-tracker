import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from "@emotion/core"


const FeaturedIcon = ({
  icon,
  size,
  color,
}) => {
  return (
    <span
      css={css`
        font-size: ${size/3}px;
        display: inline-block;
        line-height: ${size}px;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        color: white;
      `}
      className='rounded-circle'
    >
      <FontAwesomeIcon icon={icon} />
    </span>
  );
};

export default FeaturedIcon;
