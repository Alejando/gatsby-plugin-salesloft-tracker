import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from "react-emotion"


const FeaturedIcon = ({
  icon,
}) => {
  return (
    <span
      css={css`
        font-size: 1.5rem;
        display: inline-block;
        line-height: 4rem;
        width: 4rem;
        height: 4rem;
        background-color: #ed1c24;
        color: white;
      `}
      className='rounded-circle'
    >
      <FontAwesomeIcon icon={icon} />
    </span>
  );
};

export default FeaturedIcon;
