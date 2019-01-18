import React from "react";
import { css } from 'emotion'
import videoPoster from '../../../static/images/software-density-labs.jpg';

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
      autoBuffer
      poster= {videoPoster}
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
        min-height: 360px;
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
        min-height: 360px;
      `}
    />
  )
)

export default HomeSliderBackground
