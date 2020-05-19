import React from 'react';
import { css, keyframes } from 'emotion';

const spinner = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Spinner = ({ color = '#dcdcdc', size = '20px'}) => {
	return(
		<div 
      className="spinner"
      css={ css`
        border: 3px solid ${color};
        border-top: 3px solid #ffffff;
        border-radius: 50%;
        width: ${size};
        height: ${size};
        animation: ${spinner} 2s linear infinite;
        margin-left: 5px;
      `}
    ></div>
	)
}

export default Spinner;
