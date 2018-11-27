import React from 'react'
import {
  Jumbotron,
} from 'reactstrap'
import FeaturedIcon from '../icon/featured-icon'

const Skill = ({
  icon,
  title,
  subTitle,
  descriptionHtml,
}) => (
  <Jumbotron className="p-4 bg-white">
    <div className="text-center">
      <FeaturedIcon icon={icon}/>
    </div>
    <h1 className="text-uppercase border-bottom pb-3 text-center mt-3 border-bottom mt-4">{title}</h1>
    <h2 className="text-center">{subTitle}</h2>
    <div
      className="text-center lead text-muted"
      dangerouslySetInnerHTML={{ __html: descriptionHtml }}
    />
  </Jumbotron>
)

export default Skill
