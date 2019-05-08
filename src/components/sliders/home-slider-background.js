import React from "react";
import { css } from 'emotion'
import videoPoster from '../../images/software-density-labs.jpg'
import VideoCover from 'react-video-cover'
const HomeSliderBackground = ({
  isVideo = false,
  src,
  alt,
}) => (
  isVideo ?
  ( <div
      css={css`
        height: 360px;
        width: 100%;
        overflow: hidden;
        @media (min-width: 760px) {
          height: 600px;
        }
      `} 
    >
      <VideoCover
      videoOptions={
        { src: src,
          autoPlay: true,
          muted: true ,
          loop:true ,
          poster: videoPoster
        }
      }
      css={css`
        object-fit: cover;
        z-index: -100;
        background-size: cover;
        max-height: 600px;
        filter: brightness(0.5);
        -webkit-filter: brightness(0.5);
          `}
      >
    </VideoCover>
  </div>
  )  
  :(
    <img src={src}
      alt={alt}
      css={css`
        height: 360px;
        width: 100%;
        object-fit: cover;
        z-index: -100;
        background-size: cover;
        overflow: hidden;
        filter: brightness(0.5);
        -webkit-filter: brightness(0.5);
        @media (min-width: 760px) {
          height: 600px;
        };
      `}
    />
  )
)

export default HomeSliderBackground
