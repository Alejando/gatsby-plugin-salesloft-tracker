import React from 'react';
import { css } from 'emotion'

const Banner = ({
  image,
  title = null,
  content = null,
}) => (
  <div className="banner dark-translucent-bg"
    css={css`
      min-height: ${( title || content ) ? '280px' : '200px'};
      width:  100%;
      background-image: url(${image});
      background-position: center;
      background-size: cover;
      `}
  >
    {
      (title || content) &&
      <div
        className="text-center text-white pt-5 pb-2"
        css={css`
          background-color: rgba(0, 0, 0, 0.5);
          padding-left: 20%;
          padding-right: 20%;
          min-height: 280px;
        `}
      >
        <h2 className="border-bottom pb-2 mb-2 text-uppercase">{ title }</h2>
        <p>{ content }</p>
      </div>
    }
  </div>
)
export default Banner
