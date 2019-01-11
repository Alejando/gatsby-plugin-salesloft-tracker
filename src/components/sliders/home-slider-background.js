import React from "react";
import { css } from 'emotion'


const HomeSliderBackground = ({
  isVideo = false,
  src,
  alt,
}) => (
  isVideo ?
  (
    <video
      src={src}
      autoPlay
      muted
      loop
      css={css`
        height: 100%;
        width: 100%;
        object-fit: cover;
        z-index: -100;
        background-size: cover;
        overflow: hidden;
        max-height: 600px;
        filter: brightness(0.5);
        -webkit-filter: brightness(0.5);
      `}>
    </video>
  )
  :(
    <img src={src}
      alt={alt}
      css={css`
        height: 100%;
        width: 100%;
        object-fit: cover;
        z-index: -100;
        background-size: cover;
        overflow: hidden;
        max-height: 600px;
        filter: brightness(0.5);
        -webkit-filter: brightness(0.5);
      `}
    />
  )
)

export default HomeSliderBackground
