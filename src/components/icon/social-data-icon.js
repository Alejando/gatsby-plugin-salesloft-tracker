import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'

const SocialDataIcon = ({
  socialDetails: { url, hoverBg, icon }
}) => {
  return (
    <a
      href={url}
      target="_blanK"
      rel="noopener noreferrer"
      className='btn border rounded-circle'
      aria-hidden={true}
      css={css`
        color: #cdcdcd !important;
        background: #fff;
        width: 40px;
        height: 40px;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
          color: #fff !important;
          background: ${hoverBg} }
      `}
      >
      <FontAwesomeIcon icon={["fab", icon]}  />
    </a>
  )
}

export default SocialDataIcon
