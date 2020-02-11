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
  <Jumbotron className="h-100 bg-white px-md-3 shadow borders pb-0" css={css`&:hover{ box-shadow: 0 0 !important; }`}>
    <div className="text-center">
      <FeaturedIcon icon={icon} color="#ed1c24" size="2"/>
    </div>
    <h4 className="text-uppercase border-bottom pb-3 text-center mt-3 border-bottom mt-4">{title}</h4>
    <p className="text-center">{subTitle}</p>
  </Jumbotron>
)

export default Skill