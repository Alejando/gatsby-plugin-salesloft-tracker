import React from 'react'
import {
  Jumbotron,
} from 'reactstrap'
import FeaturedIcon from '../icon/featured-icon'
import { css } from 'emotion'

const Skill = ({
  icon,
  title,
  subTitle,
  descriptionHtml,
}) => (
  <Jumbotron className="h-100 bg-white px-md-3 shadow border" css={css`&:hover{ box-shadow: 0 0 !important; }`}>
    <div className="text-center">
      <FeaturedIcon icon={icon} color="#ed1c24" size="2"/>
    </div>
    <h2 className="text-uppercase border-bottom pb-3 text-center mt-3 border-bottom mt-4">{title}</h2>
    <h3 className="text-center">{subTitle}</h3>
    <div
      className="text-center lead text-muted"
      dangerouslySetInnerHTML={{ __html: descriptionHtml }}
    />
  </Jumbotron>
)

export default Skill
