import React from 'react';
import { css } from 'emotion'

const Banner = ({image}) => (
  <div className="banner dark-translucent-bg" 
    css={css`
      height: 200px;
      width:  100%;
      background-image: url(${image});
      background-position: 50% 40%;
      `}
  />
)
export default Banner