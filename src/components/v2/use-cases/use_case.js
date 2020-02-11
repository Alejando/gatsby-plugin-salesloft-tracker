import React from 'react'
import { Col } from 'reactstrap'
import { css } from "@emotion/core"

const UseCase = ({data, align}) => (
  <Col md={6} className={`text-${align} mb-2`}>
    <div 
      dangerouslySetInnerHTML={{ __html: data.descriptionHtml }} 
      css={css`
        & p {
          margin-bottom: 10px;
        }
        & strong {
          color: #dc3545;
        }
      `}
    />
    <div css={css`color: gray; font-weight:bold;`}>
      {`- ${data.author}, ${data.job}`}
    </div>
  </Col>
)


export default UseCase;