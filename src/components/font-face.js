import React from 'react'
import { Global, css } from '@emotion/core'
import SansationRegularEot from '../assets/fonts/Sansation-Regular.eot'
import SansationRegularWoff2 from '../assets/fonts/Sansation-Regular.woff2'
import SansationRegularWoff from '../assets/fonts/Sansation-Regular.woff'
import SansationRegularTtf from '../assets/fonts/Sansation-Regular.ttf'
import SansationRegularSvg from '../assets/fonts/Sansation-Regular.svg'

function FontFace() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'Sansation';
          src: url(${SansationRegularEot}) format('embedded-opentype'), url(${SansationRegularWoff2}) format('woff2'), url(${SansationRegularWoff}) format('woff'), url(${SansationRegularTtf}) format('truetype'), url(${SansationRegularSvg}) format('svg');
          font-weight: normal;
          font-style: normal;
        }
      `}
    />
  )
}

export default FontFace
