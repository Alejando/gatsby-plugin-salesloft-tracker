import React from 'react';
import { css } from 'emotion'

const Banner = ({
  image,
  title = null,
  content = null,
  textAlign = 'center',
  children = null
}) => (
  <div className="banner dark-translucent-bg d-flex flex-row"
    css={css`
      min-height: ${( title || content ) ? 'auto' : '200px'};
      width:  100%;
      background-image: ${image ? `url(${image})` : 'none'};
      background-position: center;
      background-size: cover;
      filter: ${!title && !content ? 'brightness(0.5)' : ''};
      -webkit-filter: ${!title && !content ? 'brightness(0.5)' : ''};

      `}
  >
    {
      (title || content) &&
      <div
        className="text-center text-white py-5 w-100"
        css={css`
          background-color: ${(image ? 'rgba(0, 0, 0, 0.5)' : '#525252') };
          padding-left: 20%;
          padding-right: 20%;
        `}
      >
        <h2 className="border-bottom pb-2 mb-2 text-uppercase">{ title }</h2>
        <div className={`text-${textAlign}`}>
          <span dangerouslySetInnerHTML={{ __html: content }}></span>
          {children}
        </div>
      </div>
    }
  </div>
)
export default Banner
