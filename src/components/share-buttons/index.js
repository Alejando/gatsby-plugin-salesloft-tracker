import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'

const ShareButtons = ({
  url,
  title,
  summary
}) => (
  <ul className="list-inline mb-0">
    <li className="list-inline-item">
      <a 
        target="_blank" 
        rel="noopener noreferrer"
        href={"https://twitter.com/intent/tweet?text=" + title + " @densitylabs " + url } 
        className="btn border rounded-circle"
        css={css`
          &:hover{
            color: #fff !important;
            background: #55acee }
        `}
      >
        <FontAwesomeIcon icon={["fab", 'twitter']} />
      </a>
    </li>
    <li className="list-inline-item">
      <a 
        target="_blank" 
        rel="noopener noreferrer"
        href={"https://www.facebook.com/sharer/sharer.php?u="+ url } 
        className="btn border rounded-circle"
        css={css`
          &:hover{
            color: #fff !important;
            background: #3b5998 }
        `}
      >
        <FontAwesomeIcon icon={["fab", 'facebook']} />
      </a>
    </li>
    <li className="list-inline-item">
      <a 
        target="_blank" 
        rel="noopener noreferrer"
        href={"http://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + title + "&summary= " + summary} 
        className="btn border rounded-circle"
        css={css`
          &:hover{
            color: #fff !important;
            background: #0976b4 }
        `}
      >
        <FontAwesomeIcon icon={["fab", 'linkedin']} />
      </a>
    </li>
    <li className="list-inline-item">
      <a 
        target="_blank" 
        rel="noopener noreferrer"
        href={"https://news.ycombinator.com/submitlink?u=" + url + "&t=" + title + " &text=" + summary} 
        className="btn border rounded-circle"
        css={css`
          &:hover{
            color: #fff !important;
            background: #c15050 }
        `}
      >
        <FontAwesomeIcon icon={["fab", 'hacker-news']} />
      </a>
    </li>
    <li className="list-inline-item">
      <a 
        target="_blank" 
        rel="noopener noreferrer"
        href={"https://getpocket.com/save?url=" + url } 
        className="btn border rounded-circle"
        css={css`
          &:hover{
            color: #fff !important;
            background: #c15050 }
        `}
      >
        <FontAwesomeIcon icon={["fab", 'get-pocket']} />
      </a>
    </li>
  </ul>
)

export default ShareButtons
