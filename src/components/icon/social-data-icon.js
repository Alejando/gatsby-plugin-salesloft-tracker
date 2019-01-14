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
      css={css`
        color: #cdcdcd !important;
        background: #fff;
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
