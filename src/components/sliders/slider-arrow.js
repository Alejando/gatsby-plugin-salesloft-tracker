import React from 'react'
import { css } from 'emotion'

const SliderArrow = (
  {
    className,
    to,
    onClick,
  }
) => (
  <button 
    type="button"
    onClick={onClick}
    className={`${className}`}
    aria-label={to}
    css={css`
      z-index: 10;
      right: ${(to === 'next'? '20px':'')};
      left: ${(to === 'prev'? '20px':'')};
      width: 40px;
      height: 40px;
      &:before{
        font-size: 35px;
      }
      @media (max-width: 540px) {
        display: none;
      }
    `}>
  >
  </button>
)

export default SliderArrow

