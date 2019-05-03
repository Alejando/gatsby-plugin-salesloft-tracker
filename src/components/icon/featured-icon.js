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
        font-size: ${size}rem;
        display: inline-block;
        line-height: ${size*2}rem;
        width: ${size*2}rem;
        height: ${size*2}rem;
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
